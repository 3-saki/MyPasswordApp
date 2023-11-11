'use strict';
// ドットインストールの講座「JavaScriptでパスワードジェネレーターを作ろう」
// 最終成果へ追加で以下の点を改良
    // 数字、記号のチェックが入っているときに必ず１文字は含まれるようにした
    // 数字、記号の文字色が変わるようにした
{
    const sliderElement = document.querySelector('#slider');
    const btnElement = document.querySelector('#btn');
    
    function showPassword() {
        const resultElement = document.querySelector('#result');
        const numbersCheckbox = document.querySelector('#numbers-checkbox');
        const symbolsCheckbox = document.querySelector('#symbols-checkbox');

        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const seed = letters + letters.toUpperCase(); //最終的にconstに変更
        const seedArr = [...seed]; //配列化

        const numbers = '0123456789';
        const numbersArr = [...numbers]; //配列化

        const symbols = '!#$%&()';
        const symbolsArr = [...symbols]; //配列化

        let isNumChecked = false; //「数字」チェックボックスにチェックがついているか
        if (numbersCheckbox.checked) {
            isNumChecked = true;
            seedArr.push(...numbersArr);
        }

        let isSymbolChecked = false; //「記号」チェックボックスにチェックがついているか
        if (symbolsCheckbox.checked) {
            isSymbolChecked = true;
            seedArr.push(...symbolsArr);
        }
        
        let password = '';

        for (let i = 0; i < sliderElement.value; i++) {
            password += seedArr[Math.floor(Math.random() * seedArr.length)];
        }
        
        let hasNum = true; //PWに数値が使われているかの判定用
        if (isNumChecked) {
            hasNum = false;
            numbersArr.forEach((num) => {
                for (let i = 0; i < password.length; i++) {
                    if (num === password[i]) {
                        hasNum = true;
                        break;
                    }
                }
            });
        }

        let hasSymbol = true; //PWに記号が使われているかの判定用
        if (isSymbolChecked) {
            hasSymbol = false;
            symbolsArr.forEach((symbol) => {
                for (let i = 0; i < password.length; i++) {
                    if (symbol === password[i]) {
                        hasSymbol = true;
                        break;
                    }
                }
            });
        }
        

        if (hasNum === false) {
                console.log('RetryNumber');
            showPassword(); //数値が含まれていなければPW再作成
        } else if(hasSymbol === false) {
                console.log('RetrySymbol');
            showPassword(); //記号が含まれていなければPW再作成
        } else {
            resultElement.textContent = ''; // #resultのテキストを初期化

            for (let i = 0; i < password.length; i++) {
                // パスワード文字列を１つづつ取り出し、数字or記号でないか判別
                // 数字or記号の場合はフラグを立てる

                let flgNum = false;
                numbersArr.forEach((num) => {
                    if (num === password[i]) {
                        flgNum = true;
                    }
                });

                let flgSymbol = false;
                symbolsArr.forEach((symbol) => {
                    if (symbol === password[i]) {
                        flgSymbol = true;
                    }
                });

                // 取り出したパスワードの１文字をspanタグで囲い、数字or記号の場合はclass名も付与する
                // クラス名を付与することで、数字or記号の場合に文字の色分け
                const spanElement = document.createElement('span');
                spanElement.textContent = password[i];
                if (flgNum) {
                    spanElement.classList.add('num');
                }

                if (flgSymbol) {
                    spanElement.classList.add('symbol');
                }

                resultElement.appendChild(spanElement);
            }
            
        }
    }

    sliderElement.addEventListener('input', () => {
        const passwordLength = document.querySelector('#password-length')
        passwordLength.textContent = sliderElement.value;
    });
    
    btnElement.addEventListener('click',() => {
        showPassword();
    });

    showPassword();

}