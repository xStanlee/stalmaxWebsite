from flask import (
    Flask,
    render_template,
    url_for,
    request
)
import datetime
import pytz

from mailConfig import *

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "POST":
        # Data from forms
        rq = request.form
        email = rq.get('email')
        title = rq.get('title')
        problem = rq.get('text')

        #Alert popUps

        if email and title:
            # Auto message to clients
            msg = EmailMessage()
            msg['Subject'] = 'Dziękujemy za zgłoszenie. Postaramy się odpowiedzieć najszybciej jak to tylko możliwe.'
            msg['From'] = EMAIL_ADDRESS
            msg['To'] = email
            msg.set_content(f"""Szanowna/ny Pani/e \n\n Z przyjemnością zawiadamiamy, że zgłoszenie *-- \'{title}\' --* zostało dostarczone.
                         Dziękujemy, że zdecydował/a się Pan/i na skorzystanie z usług firmy Stal-Max. \n\n Informujemy, że opisany przez pana/ią
                         problem będzie przekazany bezzwłocznie do specjalisty.\n\n Pozdrawiamy,\nFirma Stal-max.""")
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                try:
                    smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                    smtp.send_message(msg)
                    # Transfer message to customer email
                    current_time = str(datetime.datetime.now(pytz.timezone('Europe/Warsaw')))
                    current_time = current_time.split(".", 1)
                    current_time = current_time[0]
                    toCompany = EmailMessage()
                    toCompany['Subject'] = f"""{title} {current_time}"""
                    toCompany['From'] = EMAIL_ADDRESS
                    toCompany['To'] = ['patryk.stachura@hotmail.com', 'piotr.stachura@op.pl']
                    toCompany.set_content(f"Opis tematu klienta: \n\n\n {problem} \n\n\n Email klienta: {email}")
                    smtp.send_message(toCompany)
                    return render_template('index.html', info='success')
                except SMTPException:
                    print('err')
        else:
            return render_template('index.html', info='error')
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run()