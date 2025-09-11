// Simple Markdown to HTML converter
class MarkdownConverter {
    static convert(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
        html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
        html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
        html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
        html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

        // Code (inline)
        html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

        // Images
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

        // Line breaks and paragraphs
        html = html.replace(/\n\s*\n/gim, '</p><p>');
        html = html.replace(/\n/gim, '<br>');

        // Wrap in paragraph tags if not already wrapped
        if (!html.startsWith('<h') && !html.startsWith('<p')) {
            html = '<p>' + html + '</p>';
        }

        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/gim, '');
        html = html.replace(/<p>\s*<\/p>/gim, '');

        return html;
    }
}

// Blog functionality
class Blog {
    constructor() {
        this.entriesContainer = document.getElementById('entries-container');
        this.loadingElement = document.getElementById('loading');
    }

    async init() {
        try {
            await this.loadEntries();
        } catch (error) {
            console.error('Error loading blog:', error);
            this.showError('Failed to load blog entries. Please try again later.');
        }
    }

    async loadEntries() {
        try {
            // Fetch the entries.json file
            const response = await fetch('entries.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.entries || !Array.isArray(data.entries)) {
                throw new Error('Invalid entries.json format');
            }

            // Hide loading message
            this.loadingElement.style.display = 'none';

            // Load each entry
            for (const entryFile of data.entries) {
                await this.loadEntry(entryFile);
            }

            if (data.entries.length === 0) {
                this.showMessage('No blog entries found.');
            }

        } catch (error) {
            console.error('Error fetching entries:', error);
            throw error;
        }
    }

    async loadEntry(filename) {
        try {
            const response = await fetch(`entries/${filename}`);
            if (!response.ok) {
                console.warn(`Could not load entry: ${filename}`);
                return;
            }

            const markdownContent = await response.text();
            const htmlContent = MarkdownConverter.convert(markdownContent);

            this.renderEntry(htmlContent, filename);

        } catch (error) {
            console.error(`Error loading entry ${filename}:`, error);
        }
    }

    renderEntry(htmlContent, filename) {
        const entryElement = document.createElement('article');
        entryElement.className = 'blog-entry';
        entryElement.innerHTML = htmlContent;

        // Add a data attribute for the filename (useful for debugging)
        entryElement.setAttribute('data-entry', filename);

        this.entriesContainer.appendChild(entryElement);
    }

    showError(message) {
        this.loadingElement.innerHTML = `<p style="color: #ff6b6b;">Error: ${message}</p>`;
    }

    showMessage(message) {
        this.loadingElement.innerHTML = `<p>${message}</p>`;
        this.loadingElement.style.display = 'block';
    }
}

// Initialize the blog when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const blog = new Blog();
    blog.init();
});
