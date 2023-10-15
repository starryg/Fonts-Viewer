document.addEventListener('DOMContentLoaded', () => {
    const fontFileInput = document.getElementById('fontFile');
    const textInput = document.getElementById('textInput');
    const textOutput = document.getElementById('textOutput');
    const fontOutput = document.getElementById('fontOutput');

    let selectedFont = 'sans-serif'; // 默认字体

    // Handle font file input change
    fontFileInput.addEventListener('change', () => {
        const file = fontFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const fontUrl = URL.createObjectURL(file);
                const fontName = 'customFont'; // 使用固定名称
                const font = new FontFace(fontName, `url(${fontUrl})`);
                font.load().then(() => {
                    document.fonts.add(font);
                    selectedFont = fontName;
                    updateTextFont();
                    updateFontOutput(file.name.replace(/\.[^.]+$/, '')); // 更新为所选字体文件的文件名（去掉后缀）
                });
            };
            reader.readAsArrayBuffer(file);
        }
    });

    // Update the text font based on the selected font
    function updateTextFont() {
        textOutput.style.fontFamily = `${selectedFont}, sans-serif`;
    }

    // Update the displayed font name (without file extension)
    function updateFontOutput(fontName) {
        fontOutput.innerText = `字体: ${fontName}`;
    }

    // Handle text input change
    textInput.addEventListener('input', () => {
        textOutput.innerText = textInput.value;
    });
});
