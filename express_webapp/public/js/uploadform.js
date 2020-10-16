function changeform(input) {
    if (input.files.length > 0) {
        document.getElementById("formText").innerHTML = "File <strong>" + input.files[0].name + "</strong>";
    } else {
        document.getElementById("formText").innerHTML = "Drag your JSON files here or click in this area.";
    }
}