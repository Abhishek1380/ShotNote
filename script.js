const paragraphs = [
    {
        english: "This is the first English paragraph. It contains some text about a specific topic.",
        japanese: "これは最初の日本語の段落です。特定のトピックについてのテキストが含まれています。"
    },
    {
        english: "This is the second English paragraph. It provides additional information about the subject.",
        japanese: "これは二番目の日本語の段落です。この主題に関する追加情報を提供します。"
    },
    {
        english: "This is the third English paragraph. It continues the discussion and elaborates further.",
        japanese: "これは三番目の日本語の段落です。議論を続け、さらに詳しく説明します。"
    },
    {
        english: "This is the fourth English paragraph. It summarizes the key points made previously.",
        japanese: "これは四番目の日本語の段落です。以前の主要なポイントを要約します。"
    },
    {
        english: "This is the fifth English paragraph. It concludes the discussion with final thoughts.",
        japanese: "これは五番目の日本語の段落です。最終的な考えで議論を締めくくります。"
    }
];

let currentParagraph = 0;
let currentLanguage = 'english';

function showParagraph() {
    const paragraphElement = document.getElementById("paragraph");
    paragraphElement.innerText = paragraphs[currentParagraph][currentLanguage];
}

function showLanguage(language) {
    currentLanguage = language;
    showParagraph();
}

function nextParagraph() {
    if (currentParagraph < paragraphs.length - 1) {
        currentParagraph++;
        showParagraph();
    }
}

function prevParagraph() {
    if (currentParagraph > 0) {
        currentParagraph--;
        showParagraph();
    }
}

// Initialize with the first paragraph
showParagraph();
