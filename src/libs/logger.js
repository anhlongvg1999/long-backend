const ModuleWinston = require('winston');
const { createLogger, format, transports } = ModuleWinston;
const { combine, timestamp, label, printf } = format;

const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const TIME_ZONE_VIETNAM_HCM = "Asia/Ho_Chi_Minh";

const ConfigColorCommand = require('./color');

const color = {
    'info' : ConfigColorCommand.fgGreen,
    'error': ConfigColorCommand.fgRed,
    'warn' : ConfigColorCommand.fgYellow,
};

const {
    NODE_ENV,
} = process.env;

function getTimeVietNamHCM(date) { 
    return momentTimeZone.tz(date, TIME_ZONE_VIETNAM_HCM); 
}

const formatLog = printf(({ label, level, message, timestamp }) => {
    if (NODE_ENV != 'production') {
        return `[${ConfigColorCommand.fgCyan || ''}${ getTimeVietNamHCM(moment(timestamp)).format("DD MMM YYYY hh:mm:a")}\x1b[0m] [${ConfigColorCommand.fgBlue || ''}${label}\x1b[0m] [${color[level] || ''}${level.toUpperCase()}\x1b[0m] : ${message}`;
    } 
    return `[${ getTimeVietNamHCM(moment(timestamp)).format("DD MMM YYYY hh:mm:a")}][${label}] [${level.toUpperCase()}] : ${message}`;
});

module.exports = {
    log: function(data, fileLogName, fileLogFolderName, level = 'info', logLabel = 'System Log') {

        fileLogName = fileLogName ? fileLogName : 'system';
        let filename = '';
        if (fileLogFolderName) {
            filename = `./logs/${fileLogFolderName}/${fileLogName}.log`;
        } else {
            filename = `./logs/${fileLogName}.log`;
        }
        let transports = [];
        if (NODE_ENV == 'production') {
            transports.push(new ModuleWinston.transports.File({ 
                colorize: true,
                filename
            }));
        } else {
            transports.push(
                new(ModuleWinston.transports.Console)({
                    level: level,
                    colorize: true,
                    timestamp: function () {
                        return (new Date()).toLocaleTimeString();
                    },
                    prettyPrint: true
                })
            );
        }
        let loggerWinston = createLogger({
            format: combine(
                timestamp(),
                ModuleWinston.format.prettyPrint(),
                ModuleWinston.format.metadata(),
                ModuleWinston.format.json(),
                label({ label: logLabel }),
                formatLog
            ),
            transports
        });

        loggerWinston.log({
            level: level,
            message: data
        });
        loggerWinston.close();
    }
};
