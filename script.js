let currentPath = '';
let currentRepo = null;

async function fetchRepo() {
    const owner = document.getElementById('owner').value.trim();
    const repo = document.getElementById('repo').value.trim();
    
    if (!owner || !repo) {
        showError("Please enter both repository owner and name!");
        return;
    }

    showLoading();
    try {
        // Fetch repository info
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!repoResponse.ok) {
            throw new Error("Repository not found!");
        }
        currentRepo = await repoResponse.json();

        // Fetch repository contents
        const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
        if (!contentsResponse.ok) {
            throw new Error("Failed to fetch repository contents!");
        }
        const contents = await contentsResponse.json();

        // Display repository information
        displayRepoInfo(currentRepo);
        displayContents(contents);
        
        // Try to fetch and display README
        fetchReadme(owner, repo);

        document.getElementById('repo-content').style.display = 'flex';
        document.getElementById('error-message').innerHTML = '';
    } catch (error) {
        showError(error.message);
    }
}

function displayRepoInfo(repo) {
    const repoInfo = document.getElementById('repo-info');
    repoInfo.innerHTML = `
        <h2>${repo.name}</h2>
        <p>${repo.description || 'No description available.'}</p>
        <div class="stats">
            <div class="stat-item">
                <i class="fas fa-star"></i>
                <p>${repo.stargazers_count}</p>
                <small>Stars</small>
            </div>
            <div class="stat-item">
                <i class="fas fa-code-branch"></i>
                <p>${repo.forks_count}</p>
                <small>Forks</small>
            </div>
            <div class="stat-item">
                <i class="fas fa-eye"></i>
                <p>${repo.watchers_count}</p>
                <small>Watchers</small>
            </div>
        </div>
    `;
}

function displayContents(contents) {
    const fileExplorer = document.getElementById('file-explorer');
    fileExplorer.innerHTML = '<h3>Files</h3>';
    
    contents.sort((a, b) => {
        // Folders first, then files
        if (a.type === b.type) {
            return a.name.localeCompare(b.name);
        }
        return a.type === 'dir' ? -1 : 1;
    }).forEach(item => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `
            <i class="fas ${item.type === 'dir' ? 'fa-folder folder' : 'fa-file file'}"></i>
            ${item.name}
        `;
        div.onclick = () => fetchContent(item);
        fileExplorer.appendChild(div);
    });
}

async function fetchContent(item) {
    const owner = document.getElementById('owner').value.trim();
    const repo = document.getElementById('repo').value.trim();
    
    if (item.type === 'dir') {
        try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error('Failed to fetch directory contents');
            const contents = await response.json();
            displayContents(contents);
            updateBreadcrumb(item.path);
        } catch (error) {
            showError(error.message);
        }
    } else {
        try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error('Failed to fetch file content');
            const data = await response.json();
            const content = atob(data.content);
            
            document.getElementById('content').innerHTML = `
                <h3>${item.name}</h3>
                <pre>${content}</pre>
            `;
            updateBreadcrumb(item.path);
        } catch (error) {
            showError(error.message);
        }
    }
}

async function fetchReadme(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        if (!response.ok) return;
        const data = await response.json();
        const content = atob(data.content);
        
        document.getElementById('content').innerHTML = `
            <h3>README</h3>
            <div class="readme">${content}</div>
        `;
    } catch (error) {
        console.error('No README found');
    }
}

function updateBreadcrumb(path) {
    const parts = path.split('/');
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = parts.map((part, index) => {
        const currentPath = parts.slice(0, index + 1).join('/');
        return `<a href="#" onclick="navigateTo('${currentPath}')">${part}</a>`;
    }).join('<span>/</span>');
}

function navigateTo(path) {
    const owner = document.getElementById('owner').value.trim();
    const repo = document.getElementById('repo').value.trim();
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
        .then(response => response.json())
        .then(content => {
            if (Array.isArray(content)) {
                displayContents(content);
            } else {
                fetchContent(content);
            }
        })
        .catch(error => showError(error.message));
}

function showError(message) {
    document.getElementById('error-message').innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
    `;
    document.getElementById('repo-content').style.display = 'none';
}

function showLoading() {
    document.getElementById('content').innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
    `;
}

// Handle Enter key
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchRepo();
    }
});
