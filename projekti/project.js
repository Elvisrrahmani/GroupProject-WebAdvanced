document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                performSearch(searchTerm);
            } else {
                alert('Please enter a search term');
                searchInput.focus();
            }
        });
    }
    
    function performSearch(term) {
        const searchTerm = term.toLowerCase();
        
        const allTextNodes = getTextNodes(document.body);
        const matches = [];
        
        allTextNodes.forEach(node => {
            const nodeText = node.textContent.toLowerCase();
            if (nodeText.includes(searchTerm)) {
                matches.push(node.parentNode);
            }
        });
        
        if (matches.length > 0) {
            highlightMatches(searchTerm);
            showResultCount(matches.length, term);
            
            const firstMatch = document.querySelector('mark');
            if (firstMatch) {
                firstMatch.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        } else {
            alert(`No results found for "${term}"`);
        }
    }
    
    function getTextNodes(element) {
        const textNodes = [];
        const walk = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walk.nextNode()) {
            if (node.parentNode.nodeName !== 'SCRIPT' && 
                node.parentNode.nodeName !== 'STYLE' &&
                node.textContent.trim().length > 0) {
                textNodes.push(node);
            }
        }
        
        return textNodes;
    }
    
    function highlightMatches(searchTerm) {
        removeHighlights();
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        const contentSection = document.querySelector('.content');
        if (contentSection) {
            contentSection.innerHTML = contentSection.innerHTML.replace(
                regex, 
                '<mark style="background-color: yellow; color: black;">$1</mark>'
            );
        }
    }
    
    function removeHighlights() {
        const marks = document.querySelectorAll('mark');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }
    
    function showResultCount(count, term) {
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            color: #b30000;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1001;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        message.textContent = `Found ${count} result(s) for "${term}"`;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
    
    searchInput.addEventListener('input', removeHighlights);
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            removeHighlights();
        }
    });
});