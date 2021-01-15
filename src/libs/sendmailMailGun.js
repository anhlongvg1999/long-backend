var ejs = require('ejs');
var path = require('path');
const API_KEY = 'da967b75ba0dcab13253269e8ccc01b8-ba042922-b8d02b37'
const DOMAIN = 'sandboxdf0d85752613434799ded7935759d99b.mailgun.org'
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });
export const sendMailWithTemplate = (htmlStr ,email, subject) => {
	return new Promise((resolve, reject) => {
	  const msg = {
		to: email,
		from: 'EDU SERVER <buivandat991998@gmail.com>',
		subject: subject,
		html: htmlStr
	  };
  
	  mailgun.messages().send(msg, function (error, body) {
		if (error) {
		  return reject(error)
		}
		resolve(true)
	  });
	})
  }
	export const sendmailaccount = async(data) => {
		let dataEmail = {
		  productName: "EDU NOTIFICATION",
		  name: data.name,
		  email: data.email,
		};
	  
		let pathFile = path.join(__dirname, '../../views/ProxyMail.ejs');
		ejs.renderFile(pathFile, dataEmail, function (err, html) {
		  if (err) {
			console.log('++++++++++', err)
		  }
		  return sendMailWithTemplate(html, dataEmail.email, 'EDU REGISTER ACCOUNT');
		});
	  }
