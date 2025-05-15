documentRouter.put("/update/:documentId", authMiddleware, async (req, res) => {
    try {
        const { documentId } = req.params;
        const { content, version } = req.body;

        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(401).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            return res.status(401).json({ message: "Only the owner can update the document" });
        }
        if (version < document.version) {
            return res.status(409).json({
                error: 'Version conflict detected',
                currentVersion: document.version,
                currentContent: document.content,
            });
        }

        document.history.push({
            version: document.version,
            content: document.content,
            updatedAt: new Date(),
        })
    
        document.content = content || document.content;
        document.version += 1;
        await document.save();

        res.status(201).json({ message: "Document updated", document });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update document' });
    }
});

documentRouter.get("/history/:documentId", authMiddleware, async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json({ history: document.history });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history of the document' });
    }
});

documentRouter.put("/revert/:documentId/:version", authMiddleware, async (req, res) => {
    try {
        const { documentId, version } = req.params;

        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: "Document not found" }); 
        }

        const versionData = document.history.find((v) => v.version == version);
        if (!versionData) {
            return res.status(404).json({ error: 'Version not found in history' });
        }

        document.history.push({
            version: document.version,
            content: document.content,
            updatedAt: new Date(),
        });

        document.content = versionData.content;
        document.version = versionData.version;
        await document.save();

        res.status(201).json({ message: "Document reverted successfully", document });
    } catch (error) {
        res.status(500).json({ error: 'Failed to revert version' });
    }
});

documentRouter.get("/preview/:documentId/:version", authMiddleware, async (req, res) => {
    try {
        const { documentId, version } = req.params;
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const versionData = document.history.find((v) => v.version == version);
        if (!versionData) {
            return res.status(404).json({ error: 'Version not found in history' });
        }

        res.status(201).json({ content: versionData.content, version: versionData.version });
    } catch (error) {
        res.status(500).json({ error: 'Failed to preview version', details: err.message });
    }
})

module.exports = documentRouter