const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submitForm', (req, res) => {
  const formData = req.body;

  // 將數據保存到 JSON 文件
  saveFormData(formData);

  // 回應客戶端
  res.send('表單已提交，謝謝！');
});

app.listen(port, () => {
  console.log(`應用正在運行，請訪問 http://localhost:${port}`);
});

function saveFormData(formData) {
  // 讀取現有數據
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync('formData.json'));
  } catch (error) {
    // 如果文件不存在或內容不是有效 JSON，忽略錯誤
  }

  // 添加新數據
  existingData.push(formData);

  // 寫入數據回文件
  fs.writeFileSync('formData.json', JSON.stringify(existingData, null, 2), 'utf-8');
}
