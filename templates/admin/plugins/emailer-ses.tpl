<h1><i class="fa fa-envelope-o"></i> Emailer (AWS SES)</h1>

<div class="row">
    <div class="col-lg-12">
        <blockquote>
            <p>You will need:</p>
            <ol>
                <li>An AWS account</li>
                <li>SES configured for the region nearest your server</li>
                <li>A validated email address or domain in AWS SES</li>
            </ol>
            <p>This plugin uses the default credential provider chain from AWS SDK for JavaScript V3. For information on how to setup your credentials so the plugin can use them, check the following AWS documention: <a href="https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html">https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html</a></p>
        </blockquote>
    </div>
</div>
<hr />
<form role="form" class="emailer-settings">
    <fieldset>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="region">Region</label>
                    <select class="form-control" id="region" name="region" title="AWS Region">
                        <option value="">...</option>
                        <option value="us-east-2">US-East (Ohio)</option>
                        <option value="us-east-1">US-East (N. Virginia)</option>
                        <option value="us-west-1">US-West (N. California)</option>
                        <option value="us-west-2">US-West (Oregon)</option>
                        <option value="af-south-1">Africa (Cape Town)</option>
                        <option value="ap-southeast-3">Asia Pacific (Jakarta)</option>
                        <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                        <option value="ap-northeast-3">Asia Pacific (Osaka)</option>
                        <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
                        <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                        <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
                        <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
                        <option value="ca-central-1">Canada (Central)</option>
                        <option value="eu-central-1">Europe (Frankfurt)</option>
                        <option value="eu-west-1">Europe (Ireland)</option>
                        <option value="eu-west-2">Europe (London)</option>
                        <option value="eu-south-1">Europe (Milan)</option>
                        <option value="eu-west-3">Europe (Paris)</option>
                        <option value="eu-north-1">Europe (Stockholm)</option>
                        <option value="il-central-1">Israel (Tel Aviv)</option>
                        <option value="me-south-1">Middle East (Bahrain)</option>
                        <option value="sa-east-1">South America (São Paulo)</option>
                    </select>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="fromAddress">From Address</label>
                    <input type="text" class="form-control" id="fromAddress" name="fromAddress" />
                </div>
            </div>
        </div>
        <button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
    </fieldset>
</form>