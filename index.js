const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

app.post("/chatGPT", async (req, res) => {
    const configuration = new Configuration({
        apiKey: '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',
    });
    const data = req.body;
    const openai = new OpenAIApi(configuration);
    const func = async () => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `${data.message}` }],
        });
        return completion.data.choices[0].message;
    }
    const result = await func();
    res.send({
        code: 0,
        data: result,
        message: "响应成功",
    })
})

app.listen(9090, () => console.log("监听"));