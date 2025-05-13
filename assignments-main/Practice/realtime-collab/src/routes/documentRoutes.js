const express = require("express");
const documentRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Document = require("../models/Document");

documentRouter.post("/create", authMiddleware, async (req,res) => {
    try {
        const { title, content, teamId } = req.body;

        const newDocument = new Document({
            title,
            content,
            teamId,
            owner: req.user.userId,
        });

        await newDocument.save();
        res.status(201).json({ message: "Document created successfully", document: newDocument });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create document' });
    }
});

documentRouter.get("/team/:teamId", authMiddleware, async (req, res) => {
    try {
        const { teamId } = req.params;
        const documents = await Document.find({ teamId });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

documentRouter.put("/update/:documentId", authMiddleware, async (req, res) => {
    try {
        const { documentId } = req.params;
        const { title, content, version } = req.body;

        const document = await Document.findById(documentId);
        if (!document) {
            res.status(401).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            res.status(401).json({ message: "Only the owner can update the document" });
        }
        if (version < document.version) {
            return res.status(409).json({
                error: 'Version conflict detected',
                currentVersion: document.version,
                currentContent: document.content,
            });
        }
        
        document.title = title || document.title;
        document.content = content || document.content;
        document.version += 1;
        await document.save();

        res.status(201).json({ message: "Document updated", document });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update document' });
    }
});

documentRouter.delete("/delete/:documentId", authMiddleware, async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(401).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Only the owner can delete the document' });
        }

        await document.remove();
        res.json({ message: "Document deleted" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete document' });
    }
});

module.exports = documentRouter;