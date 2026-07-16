export default function EnFeedbackPage() {
  return (
    <div>
      <h1>Leave a Message</h1>
      <p>If you are interested in our products, please leave your information and we will contact you shortly.</p>
      <form className="contact-form" action="/api/feedback" method="post">
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Company
          <input name="company" />
        </label>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Phone
          <input name="phone" />
        </label>
        <label>
          Message
          <textarea name="message" rows={5} required />
        </label>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}
