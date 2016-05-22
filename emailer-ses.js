var aws = require('aws-sdk');
var winston = module.parent.require('winston');
var meta = module.parent.require('./meta');
var Emailer = {};
var ses;
var fromAddress;

Emailer.init = function(params, callback){
    function render(req, res, next){
        res.render('admin/plugins/emailer-ses', {});
    }
    
    meta.settings.get('emailer-ses', function(err, settings) {
        if(!err && settings && settings.accessKeyID && settings.secretAccessKey && settings.region && settings.fromAddress) {
            var creds = new aws.Credentials(settings.accessKeyID, settings.secretAccessKey, null);
            ses = new aws.SES({credentials: creds, region: settings.region, apiVersion: '2010-12-01'});
            fromAddress = settings.fromAddress;
        } else {
            winston.error('[emailer-ses] Settings are not configured!');
        }
    });
    
    params.router.get('/admin/plugins/emailer-ses', params.middleware.admin.buildHeader, render);
    params.router.get('/api/admin/plugins/emailer-ses', render);
    
    callback();
};

Emailer.send = function(data, callback){
    if (!ses) {
        return winston.error('[emailer-ses] Connection to SES failed!');
    } else {
        ses.sendEmail({
            Source: fromAddress,
            Destination: {
                ToAddresses: [
                    data.to
                ]
            },
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
                winston.error('[emailer-ses] Problem sending email: ' + err);
            }
        });
    }
};

Emailer.admin = {
    menu: function(header, callback){
        header.plugins.push({
            "route": '/plugins/emailer-ses',
            "icon": 'fa-envelope-o',
            "name": 'Emailer (AWS SES)'
        });
        
        callback(null, header);
    }
};

module.exports = Emailer;