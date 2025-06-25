// Main function that runs when the DOM is loaded
function main() {
    displayPosts();
    addNewPostListener();
    setupEditForm();
    
    // Show first post details on page load
    setTimeout(() => {
        const firstPost = document.querySelector('.post-item');
        if (firstPost) {
            firstPost.click();
        }
    }, 300);
}

// Display all posts in the post list with thumbnails
function displayPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = ''; // Clear existing content
            
            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'post-item';
                postItem.innerHTML = `
                    <div class="post-thumbnail">
                        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : '<div class="no-image">No Image</div>'}
                    </div>
                    <h3>${post.title}</h3>
                `;
                postItem.dataset.id = post.id;
                
                // Add click event to each post item
                postItem.addEventListener('click', () => handlePostClick(post.id));
                
                postList.appendChild(postItem);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Handle click on a post to show its details with image
function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = `
                <div class="post-header">
                    <h2>${post.title}</h2>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
                </div>
                <p><strong>Author:</strong> ${post.author}</p>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button class="edit-btn" data-id="${post.id}">Edit</button>
                    <button class="delete-btn" data-id="${post.id}">Delete</button>
                </div>
            `;
            
            // Add event listeners for edit and delete buttons
            document.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                showEditForm(post);
            });
            
            document.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this post?')) {
                    deletePost(post.id);
                }
            });
        })
        .catch(error => console.error('Error fetching post details:', error));
}

// Show edit form with post data
function showEditForm(post) {
    const editForm = document.getElementById('edit-post-form');
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
    document.getElementById('edit-image').value = post.image || '';
    editForm.dataset.id = post.id;
    editForm.classList.remove('hidden');
}

// Setup edit form submission
function setupEditForm() {
    const editForm = document.getElementById('edit-post-form');
    const cancelEdit = document.getElementById('cancel-edit');
    
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = editForm.dataset.id;
        const updatedPost = {
            title: document.getElementById('edit-title').value,
            content: document.getElementById('edit-content').value,
            image: document.getElementById('edit-image').value || null
        };
        
        updatePost(postId, updatedPost);
    });
    
    cancelEdit.addEventListener('click', () => {
        editForm.classList.add('hidden');
    });
}

// Update post (PATCH request)
function updatePost(postId, updatedPost) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        return response.json();
    })
    .then(updatedPost => {
        // Refresh the posts list and show updated post
        displayPosts();
        handlePostClick(postId);
        document.getElementById('edit-post-form').classList.add('hidden');
    })
    .catch(error => {
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
    });
}

// Delete post
function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        // Refresh the posts list and clear details
        displayPosts();
        document.getElementById('post-detail').innerHTML = '<p>Select a post to view details</p>';
    })
    .catch(error => {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
    });
}

// Add event listener for new post form submission
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;
        const image = document.getElementById('image').value;
        
        // Create new post object with image
        const newPost = {
            title,
            content,
            author,
            image: image || null
        };
        
        // Send POST request to API
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return response.json();
        })
        .then(post => {
            // Refresh the posts list
            displayPosts();
            // Clear form
            form.reset();
        })
        .catch(error => {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        });
    });
}

// Run the main function when DOM is loaded
document.addEventListener('DOMContentLoaded', main);