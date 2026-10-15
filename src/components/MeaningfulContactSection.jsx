import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function MeaningfulContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg("Please enter your name and email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitted(false);
    setErrorMsg("");
  };

  return (
    <section className="meaningful-contact-section" id="contact-form" aria-label="Connect With Us">
      <div className="meaningful-contact-container">
        {/* Exact Architectural Box with broken top line & blue speech bubble matching reference image */}
        <div className="ref-contact-box">
          {/* Top Border Row with Left line, Centered Title in Gap, Right line with Blue Speech Bubble */}
          <div className="ref-contact-top-row">
            <div className="ref-top-line-left" aria-hidden="true" />
            <h2 className="ref-contact-title">
              Great Brands start with Meaningful Discussion, Connect Us Now!
            </h2>
            <div className="ref-top-line-right-wrap">
              <div className="ref-top-line-right" aria-hidden="true" />
              {/* Blue Speech Bubble matching user request */}
              <div className="ref-speech-bubble-blue" aria-label="Direct Consultation Badge">
                <span className="ref-bubble-text">
                  Speak directly<br />with a Senior<br />Brand Consultant
                </span>
                <div className="ref-bubble-tail" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Inner Form Area */}
          <div className="ref-contact-body">
            {isSubmitted ? (
              <div className="meaningful-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle2 className="w-12 h-12 text-[#1E4DFF]" />
                </div>
                <h3 className="success-title">Message Sent Successfully!</h3>
                <p className="success-subtitle">
                  Thank you, <strong>{formData.name}</strong>. Senior Creative Director Yogesh Dahiya
                  and our brand team will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  className="ref-submit-btn"
                  onClick={handleReset}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ref-contact-form-grid" noValidate>
                {/* Left Column: NAME, EMAIL, PHONE */}
                <div className="ref-form-col-left">
                  <div className="ref-field-group">
                    <label htmlFor="ref-user-name" className="ref-field-label">
                      NAME
                    </label>
                    <input
                      type="text"
                      id="ref-user-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="ref-field-input"
                      required
                    />
                  </div>

                  <div className="ref-field-group">
                    <label htmlFor="ref-user-email" className="ref-field-label">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="ref-user-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="ref-field-input"
                      required
                    />
                  </div>

                  <div className="ref-field-group">
                    <label htmlFor="ref-user-phone" className="ref-field-label">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      id="ref-user-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="ref-field-input"
                    />
                  </div>
                </div>

                {/* Right Column: WHAT'S IN YOUR MIND & Submit Button */}
                <div className="ref-form-col-right">
                  <div className="ref-field-group ref-textarea-group">
                    <label htmlFor="ref-user-mind" className="ref-field-label">
                      WHAT&apos;S IN YOUR MIND
                    </label>
                    <textarea
                      id="ref-user-mind"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="ref-field-textarea"
                    />
                  </div>

                  {errorMsg && <p className="ref-error-msg">{errorMsg}</p>}

                  <div className="ref-submit-row">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="ref-submit-btn"
                    >
                      {isLoading ? "Sending..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
