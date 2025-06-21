const { SESv2Client, SendEmailCommand } = require('@aws-sdk/client-sesv2');
const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');
const routeHelpers = require.main.require('./src/routes/helpers');
const controllers = require('./lib/controllers');

const Emailer = {};
let sesClient;
var ses;
let senderAddress;

Emailer.init = async(params) => {
    const { router } = params;

    const { region, fromAddress } = await meta.settings.get('emailer-ses');
    if (!region || ! fromAddress) {
        winston.error(`[plugins/emailer-ses] Region and FromAddress must both be specified for emails to send.`);
    }

    sesClient = new SESv2Client({ region: region });
    senderAddress = fromAddress;

    routeHelpers.setupAdminPageRoute(router, '/admin/plugins/emailer-ses', controllers.renderAdminPage);
}

Emailer.sendEmail = async(data) => {
    if (!sesClient) {
        winston.error(`[plugins/emailer-ses] No SES Client available.`);
        throw new Error('No SES Client available, check settings.');
    }

    const input = {
        FromEmailAddress: senderAddress,
        Destination: {
            ToAddresses: [
                data.to
            ]
        },
        Content: {
            Simple: {
                Subject: {
                    Data: data.subject
                },
                Body: {
                    Text: {
                        Data: data.plaintext
                    },
                    Html: {
                        Data: data.html
                    }
                },
            },
        },
    };

    const command = new SendEmailCommand(input);

    try {
        const response = await sesClient.send(command);
    } catch (error) {
        winston.error(`[plugins/emailer-ses] SES Error: ${JSON.stringify(error)}.`);
        throw new Error(error);
    }
}

Emailer.addAdminNavigation = (header) => {
    header.plugins.push({
        route: '/plugins/emailer-ses',
        icon: 'fa-envelope-o',
        name: 'Emailer (AWS SES)'
    });

    return header;
};

module.exports = Emailer;