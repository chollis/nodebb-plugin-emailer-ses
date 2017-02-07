<h1><i class="fa fa-envelope-o"></i> Emailer (AWS SES)</h1>

<div class="row">
    <div class="col-lg-12">
        <blockquote>
            <p>You will need:</p>
            <ol>
                <li>An AWS account</li>
                <li>SES configured for the region nearest your server</li>
                <li>A validated email address or domain in AWS SES</li>
                <li>An IAM user configured with API access to SES or an IAM role configured for your instance</li>
            </ol>
            <p>To use an IAM role, leave the AccessKeyID and SecretAccessKey blank.</p>
        </blockquote>
    </div>
</div>
<hr />
<form role="form" class="emailer-settings">
    <fieldset>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="accessKeyID">AccessKeyID</label>
                    <input type="text" class="form-control" id="accessKeyID" name="accessKeyID" />
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="secretAccessKey">SecretAccessKey</label>
                    <input type="text" class="form-control" id="secretAccessKey" name="secretAccessKey" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="region">Region</label>
                    <select class="form-control" id="region" name="region" title="AWS Region">
                        <option value="">...</option>
                        <option value="us-east-1">US-East (N. Virginia)</option>
                        <option value="us-west-2">US-West (Oregon)</option>
                        <option value="eu-west-1">EU-West (Ireland)</option>
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

<script type="text/javascript">
    require(['settings'], function(Settings){
        var form = $('.emailer-settings');
        Settings.load('emailer-ses', form);
        
        $('#save').click(function(event){
            event.preventDefault();
            Settings.save('emailer-ses', form, function() {
                app.alert({
                    type: 'success',
                    alert_id: 'emailer-ses-saved',
                    title: 'Settings saved',
                    message: 'Click here to reload NodeBB',
                    timeout: 2500,
                    clickfn: function(){
                        socket.emit('admin.reload');
                    }
                });
            });
        });
    });
</script>