import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('new-post-btn');
    const newPostForm = document.getElementById('new-post-form');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const postsContainer = document.getElementById('posts-container');

    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    newPostBtn.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
    });

    submitPostBtn.addEventListener('click', async () => {
        const title = document.getElementById('post-title').value;
        const author = document.getElementById('post-author').value;
        const body = quill.root.innerHTML;

        if (title && author && body) {
            await backend.addPost(title, body, author);
            loadPosts();
            newPostForm.classList.add('hidden');
        } else {
            alert('Please fill in all fields');
        }
    });

    async function loadPosts() {
        postsContainer.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
        const posts = await backend.getPosts();
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <h2>${post.title}</h2>
                <h4>by ${post.author}</h4>
                <div>${post.body}</div>
            </div>
        `).join('');
    }

    loadPosts();
});
