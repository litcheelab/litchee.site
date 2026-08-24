const socialLinks = [
  {
    label: "YouTube",
    handle: "@LitcheeLab",
    href: "https://www.youtube.com/@LitcheeLab",
  },
  {
    label: "Instagram",
    handle: "@fabcitychallenge.highschool",
    href: "https://www.instagram.com/fabcitychallenge.highschool",
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-contact-footer" id="contact">
      <div className="contact-footer-heading">
        <p>CONTACT · 联系我们</p>
        <h2>一起保持联系。</h2>
        <span>关注我们的项目、活动与学习者故事。</span>
      </div>

      <div className="contact-footer-accounts" aria-labelledby="wechat-accounts-title">
        <h3 id="wechat-accounts-title">微信公众号</h3>
        <div className="contact-qr-grid">
          <figure>
            <img
              src="/assets/contact/litchee-lab-wechat.jpg"
              alt="南荔科创教育微信公众号二维码"
              width={258}
              height={258}
            />
            <figcaption>南荔科创教育</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/contact/fcc-hs-wechat.jpg"
              alt="Fab City Challenge High School 微信公众号二维码"
              width={258}
              height={258}
            />
            <figcaption>FCC High School</figcaption>
          </figure>
        </div>

      </div>

      <div className="contact-footer-links">
        <h3>社交媒体</h3>
        <div className="contact-social-list">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              <span>{link.label}</span>
              <strong>{link.handle}</strong>
              <em aria-hidden="true">↗</em>
            </a>
          ))}
          <div className="contact-social-item">
            <span>客服微信号</span>
            <strong>@litcheelab333</strong>
            <em aria-hidden="true">＋</em>
          </div>
        </div>
      </div>

      <div className="contact-footer-bottom">
        <span>© Litchee Lab</span>
        <a href="https://litchee.site">litchee.site</a>
      </div>
    </footer>
  );
}
