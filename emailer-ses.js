var aws = require('aws-sdk');
var winston = module.parent.require('winston');
var Settings = module.parent.require('./settings');
var Emailer = {};
var ses;
var defaultSettings = {
    strings: {
        accessKeyID : '',
        secretAccessKey: '',
        region: '',
        fromAddress: ''
    }
};
var debug;

var settings = new Settings('emailer-ses', '0.1.0', defaultSettings, function(){
    if (debug){
        winston.info('emailer-ses settings have been loaded.');
    }
});
                            
function sesConnect(){
    if (!ses){
        ses = new aws.SES({apiVersion: '2010-12-01'});
    }
    
    return ses;
}

Emailer.init = function(params, callback){
    debug = env === 'development';
    
    var aKey = settings.get('strings.accessKeyID');
    var sKey = settings.get('strings.secretAccessKey');
    var reg = settings.get('strings.region');
    aws.config.update({accesskeyID: aKey, secretAccessKey: sKey, region: reg});
    
    callback();
};

Emailer.send = function(data, callback){
    if (!ses) {
        winston.error('emailer-ses is not setup correctly');
        return callback(null, data);
    }
    
    var fromAddress = settings.get('strings.fromAddress');
    
    sesConnect().sendEmail({
        Source: fromAddress,
        Destination: data.to,
        Message: {
            Subject: {
                Data: data.subject
            },
            Body: {
                Html: {
                    Data: data.html,
                },
                Text: {
                    Data: data.plaintext,
                }
            }
        }
    }, function(err, data){
        if (err) {
            winston.error('Problem sending email');
        } else {
            winston.info('Email sent successfully');
        }
    })
};

module.exports = Emailer;