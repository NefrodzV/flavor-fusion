import path from 'path';
import { fileURLToPath } from 'url';
// 1. Import the plugin (ESM style)
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 2. Highly recommended: Safely wipes dist before rebuilding
    },
    // 3. Add the plugins array
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Path to your source HTML file (change if it lives in a /src folder)
            filename: 'index.html',
        }),
    ],
    module: {
       rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
       ],
    },
    resolve: {
        extensions: ['.js']
    }
}