window.onload = function () {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');
    const markdownArea = document.getElementById('markdown');

    const convertTextAreaToMarkdown = function () {
        const markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    const didChangeOccur = function () {
        if (previousMarkdownValue != value) {
            return true;
        }
        return false;
    }

    setInterval(function() {
        if (didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    sharejs.open('home', 'text', function(error, doc) {
        doc.attach_textarea(pad);
    });
};