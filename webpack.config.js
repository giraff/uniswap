const path = require("path"); // 절대 경로 > 상대 경로 전환
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    // entry 기준 모든 파일 번들링
    main: "./src/index",
  },
  // 번들링 될 파일 확장자 등록
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    // [name]에는 entry에 추가한 main이 문자열로 들어간다
    filename: "bundle.js",
    // 절대 경로를 사용하므로 노드 코어 모듈인 path의 resolve() 함수를 사용해 계산한다
    path: path.resolve(__dirname, "build"),
  },
  module: {
    // 웹팩은 기본적으로 자바스크립트와 JSON만 빌드할 수 있다
    // 로더는 웹팩이 JS 파일이 아닌 다른 파일들도 (CSS, IMG, FONT, ETC) 이해하고 모듈로 관리할 수 있게 한다
    // 로더를 사용하기 위해 필요에 맞는 로더를 설치한 후 module과 rules 키워드를 사용해 웹팩 설정 파일에 정의한다.

    rules: [
      {
        test: /\.css$/, // 파일명 또는 가지고 올 파일 패턴 정규식
        use: ["style-loader", "css-loader"], // 사용할 로더의 이름
      },
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: ["/node_modules/"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 경로 지정
      templateParameters: {
        // 템플릿에 주입할 파라미터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
    }),
    new CleanWebpackPlugin(),
  ],
  /**
   * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
   * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
   * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
   * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
   * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
   */
};
