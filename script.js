document.addEventListener('DOMContentLoaded', () => {
    // 获取页面元素
    const fontFileInputs = document.querySelectorAll('.font-file-input');
    const fixedTexts = document.querySelectorAll('.fixed-text');

    // 遍历所有字体测试模块
    fontFileInputs.forEach((fontFileInput, index) => {
        // 默认字体
        let selectedFont = 'sans-serif';

        // 处理字体文件选择
        fontFileInput.addEventListener('change', () => {
            const file = fontFileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    const fontUrl = URL.createObjectURL(file);
                    const fontName = `customFont${index}`; // 使用固定名称
                    const font = new FontFace(fontName, `url(${fontUrl})`);
                    font.load().then(() => {
                        document.fonts.add(font);
                        selectedFont = fontName;
                        // 更新文本字体样式
                        updateTextFont(index, selectedFont);
                    });
                };
                reader.readAsArrayBuffer(file);
            }
        });

        // 更新文本字体样式
        function updateTextFont(textIndex, font) {
            fixedTexts[textIndex].style.fontFamily = `${font}, sans-serif`;
        }
    });
});
