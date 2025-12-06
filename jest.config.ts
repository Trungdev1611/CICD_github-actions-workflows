export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
     '^.+\\.tsx?$': 'ts-jest',
     // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/mocks/fileMock.js",
          "\\.(css|less|scss|sass)$": "identity-obj-proxy"

  
      },
   };