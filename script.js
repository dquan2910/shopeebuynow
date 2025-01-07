async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  getData("https://shopee.vn/api/v4/pdp/get_pc?item_id=itemIDTemp&shop_id=shopIDTemp").then((data) => {
    var qty = qtyTemp;
    var i = 0;
    var numberOfModels = data.data.item.models.length;
    var productName = data.data.item.title;
    var shopName = data.data.shop_detailed.account.username;
    var item_id = data.data.item.item_id;
    var shop_id = data.data.item.shop_id;
    var new_window = window.open('');
    for (const item of data.data.item.models) {
      var model_id = item.model_id;
      var finalLink = "<textarea id='"+i+"' readonly style='font-size: 25px; width: 100%; height: 200px;'>" + "https://shopee.vn/marketplace-checkout?cartType=1&cid=5&orders=%5B%7B%22shop%22%3A%7B%22shopid%22%3A" +shop_id+ "%7D%2C%22items%22%3A%5B%7B%22itemid%22%3A" +item_id+ "%2C%22modelid%22%3A" + model_id + "%2C%22quantity%22%3A" + qty + "%7D%5D%7D%5D" + "</textarea>";
      var productInfo = '<h1>' + shopName +' - ' + productName;
      if(numberOfModels > 1)
      {
          const textarea = document.createElement("textarea");
          textarea.innerHTML = item.name.replace(/\\u/g, "&#x");
          productInfo = productInfo + ' - Phân loại: ' + textarea.value;
      }
      productInfo = productInfo + ' - Số lượng: ' + qty + '</h1>';
      new_window.document.write(productInfo);
      new_window.document.write(finalLink);
      new_window.document.write("<button style=\"width: 100%; height: 100px; background-color:#04AA6D; color: white; font-size: 35px;\" onclick=\"{\nlet textarea = document.getElementById('"+i+"');\ntextarea.select();\ndocument.execCommand('copy');}\"> Copy</button>");
      i++;
    }
  });