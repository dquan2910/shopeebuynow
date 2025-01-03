const urlParams = new URLSearchParams(window.location.search);
    var value = urlParams.get('value');
    value = value.substring(0, value.indexOf(".js"));
    var splitString = value.split('-');
    const dynamicElement = document.getElementById('content');
    var finalScript;
    
    if(splitString.length < 3)
    {
        finalScript = "Link chưa đúng";
    }
    else
    {
        finalScript = "async function getData(url = \"\") {\n" +
        "  const response = await fetch(url, {\n" +
        "    method: \"GET\",\n" +
        "    headers: {\n" +
        "      \"Content-Type\": \"application/json\",\n" +
        "    },\n" +
        "  });\n" +
        "  return response.json();\n" +
        "}\n" +
        "getData(\"https://shopee.vn/api/v4/pdp/get_pc?item_id="+splitString[0]+"&shop_id="+splitString[1]+"\").then((data) => {\n" +
        "  var qty = "+splitString[2]+";\n" +
        "  var i = 0;\n" +
        "  var numberOfModels = data.data.item.models.length;\n" +
        "  var productName = data.data.item.title;\n" +
        "  var shopName = data.data.shop_detailed.account.username;\n" +
        "  var item_id = data.data.item.item_id;\n" +
        "  var shop_id = data.data.item.shop_id;\n" +
        "  var new_window = window.open('');\n" +
        "  for (const item of data.data.item.models) {\n" +
        "    var model_id = item.model_id;\n" +
        "    var finalLink = \"<textarea id='\"+i+\"' readonly style='font-size: 25px; width: 100%; height: 200px;'>\" + \"https://shopee.vn/marketplace-checkout?cartType=1&cid=5&orders=%5B%7B%22shop%22%3A%7B%22shopid%22%3A\" +shop_id+ \"%7D%2C%22items%22%3A%5B%7B%22itemid%22%3A\" +item_id+ \"%2C%22modelid%22%3A\" + model_id + \"%2C%22quantity%22%3A\" + qty + \"%7D%5D%7D%5D\" + \"</textarea>\";\n" +
        "    var productInfo = '<h1>' + shopName +' - ' + productName;\n" +
        "    if(numberOfModels > 1)\n" +
        "    {\n" +
        "        const textarea = document.createElement(\"textarea\");\n" +
        "        textarea.innerHTML = item.name.replace(/\\\\u/g, \"&#x\");\n" +
        "        productInfo = productInfo + ' - Phân loại: ' + textarea.value;\n" +
        "    }\n" +
        "    productInfo = productInfo + ' - Số lượng: ' + qty + '</h1>';\n" +
        "    new_window.document.write(productInfo);\n" +
        "    new_window.document.write(finalLink);\n" +
        "    new_window.document.write(\"<button style=\\\"width: 100%; height: 100px; background-color:#04AA6D; color: white; font-size: 35px;\\\" onclick=\\\"{\\nlet textarea = document.getElementById('\"+i+\"');\\ntextarea.select();\\ndocument.execCommand('copy');}\\\"> Copy</button>\");\n" +
        "    i++;\n" +
        "  }\n" +
        "});";
    }
    dynamicElement.innerText = finalScript;