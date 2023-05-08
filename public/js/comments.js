const commentField = document.querySelector("#add-comment-form");
const commentButton = document.querySelector("#add-comment-btn");

const openAddComment = (event) => {
    event.preventDefault();
    commentField.classList.toggle("d-none");
};

const addComment = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector("#comment-textarea").value;

    console.log(commentBody, commentButton, commentButton.dataset.postid);

    if (commentBody) {
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({
                content: commentBody,
                post_id: commentButton.dataset.postid,
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

document
    .querySelector("#add-comment-btn")
    .addEventListener("click", openAddComment);

commentField.addEventListener("submit", addComment);
