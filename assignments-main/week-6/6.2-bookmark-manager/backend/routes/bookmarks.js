let bookmarks = []; // in memory space
let currentId = 1;

export async function addBookmark(req, res, next) {
    // write here
    try {
        const { category, url } = req.body;

        if (!category || !url) {
            return res.status(404).json({ error: "Category and Url are required" });
        }
        const newBookmark = { id: currentId++, category, url };
        bookmarks.push(newBookmark);
        res.status(201).json({ message: "Added Bookmark", newBookmark });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while adding the bookmark" });
    }
}

export async function deleteBookmark(req, res, next) {
    // write here
    try {
        const { id } = req.params;
        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id);

        if (bookIndex == -1) {
            return res.status(404).json({ error: 'Bookmark not found' });
        }
        bookmarks.splice(bookmarkIndex, 1);
        return res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the bookmark" });
    }    
}

export async function getAllBookmarks(req, res, next) {
    // write here
    res.status(201).json({ message: "All Bookmarks", bookmarks });
}