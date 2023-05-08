const postForm = document.querySelector("#new-post-form");

const blogPostSection = document.querySelector("#dashboard-blog-posts");

const createPost = async (event) => {
    const postTitle = document.querySelector("#post-title").value.trim();
    const postBody = document.querySelector("#post-textarea").value;

    if (postTitle && postBody) {
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title: postTitle,
                content: postBody,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Failed to comment");
        }
    }
};

const deletePost = async (event) => {
    let postId = event.target.dataset.postid;

    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to update post.");
    }
};

const openUpdateForm = (event) => {
    let target = event.target;
    let updatePostSection = document.querySelector(
        `#update-post-section-${target.dataset.postid}`
    );
    let originalPostSection = document.querySelector(
        `#past-blog-post-${target.dataset.postid}`
    );
    originalPostSection.classList.toggle("d-none");
    updatePostSection.classList.toggle("d-none");
};

const submitUpdate = async (event) => {
    let target = event.target;
    const postid = target.dataset.postid;
    const newPostTitle = document.querySelector(`#post-title-${postid}`);
    const newPostContent = document.querySelector(`#post-textarea-${postid}`);

    if (newPostTitle && newPostContent) {
        const response = await fetch(`/api/posts/${postid}`, {
            method: "PUT",
            body: JSON.stringify({
                title: newPostTitle.value.trim(),
                content: newPostContent.value,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Failed to update post.");
        }
    }
};

const handleClick = (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.classList.contains("update-button")) {
        openUpdateForm(event);
    }
    if (target.classList.contains("update-submit-button")) {
        submitUpdate(event);
    }
    if (target.classList.contains("delete-button")) {
        deletePost(event);
    }
};

blogPostSection.addEventListener("click", handleClick);
postForm.addEventListener("submit", createPost);
