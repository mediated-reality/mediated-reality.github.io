function copyCodeToClipboard() {
    const copyText = document.getElementById('codeBlock').innerText;
    const textArea = document.createElement('textarea');
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    const copyButton = document.getElementById('copyButton');
    copyButton.textContent = '✅ Copied!';
    setTimeout(function () {
        copyButton.textContent = '📋 Copy';
    }, 2000);
}

const initApp = () => {
    // -- year in the footer
    const year = document.getElementById('year')
    if (year) year.innerHTML = new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded', initApp)