// import pino from "pino";

// const pinoms = require('pino-multi-stream')
// const pretty = require('pino-pretty')

// const consoleStream = pretty({
//     translateTime: "yyyy-dd-mm h:MM:ss",
//     ignore: "hostname,pid",
// });

// const allStream = pretty({
//     colorize: false,
//     translateTime: "yyyy-dd-mm h:MM:ss",
//     ignore: "hostname,pid",
//     destination: "./logs/all.log"
// });

// const errorStream = pretty({
//     colorize: false,
//     translateTime: "yyyy-dd-mm h:MM:ss",
//     ignore: "hostname,pid",
//     destination: "./logs/error.log"
// });

// const streams = [
//     {stream: consoleStream },
//     {stream: allStream},
//     {level: 'error', stream: errorStream }
// ]

// let chainLoggers: any = {};

// function addLogger(id: string, blockchainName: string) {
//     chainLoggers[id] = pino(
//         {
//             prettyPrint: {
//                 colorize: false,
//                 ignore: "hostname,pid",
//                 translateTime: "yyyy-dd-mm h:MM:ss",
//             },
//         },
//         pino.destination("./logs/" + blockchainName.replace(/ /g, "") + ".log")
//     )
// }

// function logInfo(id: string, message: string) {
//     const chainLogger = chainLoggers[id]
//     chainLogger.info(message);
//     logger.info(message);
// }

// function logError(id: string, message: string) {
//     const chainLogger = chainLoggers[id]
//     chainLogger.error(message);
//     logger.error(message);
// }

// export {
//     addLogger,
//     logInfo,
//     logError
// }

// export const logger = pinoms({streams: streams})