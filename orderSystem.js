function getPrice(apple, banana, grape, melon, orange, watermelon){
    let price = apple*150 + banana*80 + grape*450 + melon*600 + orange*120 + watermelon*500;
    return price;
}

function createOrderHistory(amountList, totalPrice){
    let historyTable = document.getElementById("historyTable");
    let lastRowElem = document.getElementById("lastRow");
    let rowElems = document.getElementsByTagName("tr");

    // 何回目の注文をカウントし、trエレメントを生成する
    let count = rowElems.length - 1;
    let newRow = document.createElement("tr");
    let newCount = document.createElement("td");
    newCount.textContent = count + "回目";
    newRow.appendChild(newCount);
    
    // 注文データを生成する 
    for(let i = 0; i < amountList.length; i++){
        let newCell = document.createElement("td");
        newCell.textContent = amountList[i];
        newRow.appendChild(newCell);
    }

    // 合計金額を生成する
    let newTotalPrice = document.createElement("td");
    newTotalPrice.textContent = totalPrice + "円";
    newTotalPrice.style = "text-align: end";
    newRow.appendChild(newTotalPrice); 

    // 新しい注文履歴を生成する
    historyTable.insertBefore(newRow, lastRowElem);

    // 総合金額をアップデートする
    let finalPrice = 0;
    for(let i = 1; i < rowElems.length -1; i++){
        eachOrderPrice = parseInt(rowElems[i].lastElementChild.textContent.slice(0, -1));
        finalPrice += eachOrderPrice;
    }
    lastRowElem.lastElementChild.textContent = finalPrice + "円";
}

function makeOrder(){
    // 各フルーツのインプットエレメントを取得する    
    let appleElem = document.orderSystem.apple;
    let bananaElem = document.orderSystem.banana;
    let grapeElem = document.orderSystem.grape;
    let melonElem = document.orderSystem.melon;
    let orangeElem = document.orderSystem.orange;
    let watermelonElem = document.orderSystem.watermelon;
    let fruitList = [appleElem, bananaElem, grapeElem, melonElem, orangeElem, watermelonElem];

    // 各フルーツの数を取得する    
    let apple = parseInt(appleElem.value);
    let banana = parseInt(bananaElem.value);
    let grape = parseInt(grapeElem.value);
    let melon = parseInt(melonElem.value);
    let orange = parseInt(orangeElem.value);
    let watermelon = parseInt(watermelonElem.value);
    let amountList = [apple, banana, grape, melon, orange, watermelon];

    // 全ての注文個数を確認する
    let totalAmount = 0;
    for(let i = 0; i < amountList.length; i++){
        totalAmount += amountList[i];
    }
    if(totalAmount == 0){
        alert("全ての注文個数が0です。");
        for(let i = 0; i <= fruitList.length; i++){
            fruitList[i].style = "background-color: pink;";
            fruitList[i].addEventListener("focus", function(){
                fruitList[i].style = "background-color: transparent;";
            });
        }

    } else {
        if(confirm("注文します。よろしいですか？")){
            // 合計金額を計算する
            let totalPrice = getPrice(apple, banana, grape, melon, orange, watermelon);
            // 合計金額を表示する
            alert(`合計金額は${totalPrice}円です。`);
            // 注文履歴を追加する
            createOrderHistory(amountList, totalPrice);
            // 注文内容をクリアする
            for(let i = 0; i < fruitList.length; i++){
                fruitList[i].value = 0;
            }
        } 
    }
}

function handleCheckout(){
    let historyTable = document.getElementById("historyTable");
    let rowElems = document.getElementsByTagName("tr");
    let lastRowElem = document.getElementById("lastRow");
    let finalPrice = parseInt(lastRowElem.lastElementChild.textContent.slice(0, -1));
    
    
    // 注文履歴をチェックする
    if(rowElems.length <= 2){
        alert("注文履歴がありません。");
    } else {
        if(confirm("会計を行いますか？")){
            // 合計金額を表示する
            alert(`合計で${finalPrice}円でした。`);
            // 注文履歴をクリアする
            for(let i = 1; rowElems.length > 2;){
                historyTable.removeChild(rowElems[i]);
            }
            lastRowElem.lastElementChild.textContent = "円";
        }
    }
}