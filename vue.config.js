const  path  =  require("path");

function  resolve(dir)  {  
    return  path.join(__dirname,  dir);
}
module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '^/api': {
                //要跨域的域名
                target: 'http://127.0.0.1/api',
                // 是否启用websockets
                ws: true,
                //是否允许跨域
                changeOrigin: true,
                pathRewrite: {
                    //将你的地址代理位这个 /api 接下来请求时就使用这个/api来代替你的地址
                    '^/api': ''
                },
            }
        }
    },
    chainWebpack:  config  =>  {    
        config.resolve.alias      
            .set("@model",  resolve("src/model"))      
            .set("@assets",  resolve("src/assets"))      
            .set("@scss",  resolve("src/assets/scss"))      
            .set("@components",  resolve("src/components"))      
            .set("@views",  resolve("src/views"))      
            .set("@utils",  resolve("src/utils"))      
            .set("@conf",  resolve("src/config"))      
            .set("@store",  resolve("src/store"));  
    }

}