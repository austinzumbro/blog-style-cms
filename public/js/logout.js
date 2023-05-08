const logoutHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/users/logout", {
        method: "POST",
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to log out");
    }
};

document.querySelector("#logout-link").addEventListener("click", logoutHandler);
