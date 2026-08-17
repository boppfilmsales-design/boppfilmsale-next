export default function FeedbackPage() {
  return (
    <div>
      <h1>在线留言</h1>
      <p>如果您对我们的产品感兴趣，请留下您的信息，我们将尽快与您联系。</p>
      <form className="contact-form" action="/api/feedback" method="post">
        <label>
          姓名
          <input name="name" required />
        </label>
        <label>
          公司
          <input name="company" />
        </label>
        <label>
          邮箱
          <input name="email" type="email" />
        </label>
        <label>
          电话
          <input name="phone" />
        </label>
        <label>
          留言内容
          <textarea name="message" rows={5} required />
        </label>
        <button type="submit" className="btn">提交留言</button>
      </form>
    </div>
  );
}
