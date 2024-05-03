import styles from './page.module.scss';



const Page = () => {
    return (
        <main className={`${styles.main} ${styles.grid}`}>
                <section>
                <h1>Terms and Conditions of Use</h1>
                <div>
                    <p><em>Effective as of 2024</em></p>
                    <p>The following terms and conditions of use (referred to as &quot;Terms of Use&quot;) govern the legal framework for the provision of the site and services by <em>Benoît CABOCEL</em> and define the conditions for accessing and using the services by the &quot;User.&quot;</p>
                    <p>The Terms of Use are accessible on the site under the &quot;Terms of Use&quot; section.</p>
                </div>
                <div className={styles.grid}>
                    <article>
                        <h2>Article 1: Legal Information</h2>
                        <p>Phone number: 06.03.46.83.20</p>
                        <p>Email address: benoit.cabocel.335@gmail.com.</p>
                        <p>The hosting provider of the benoit-cabocel.fr website is Vercel</p>
                    </article>
                    <article>
                        <h2>ARTICLE 2: Site Access</h2>
                        <p>The benoit-cabocel.fr website allows the User free access to the following services:</p>
                        <p>The website offers the following services:</p>
                        <p>Informing about the commercial services provided by Benoît CABOCEL, as well as a contact service</p>
                        <p>The site is freely accessible from anywhere to any User with internet access. All costs incurred by the User to access the service (computer equipment, software, internet connection, etc.) are at their expense.</p>
                    </article>
                    <article>
                        <h2>ARTICLE 3: Data Collection</h2>
                        <p>The site ensures the User the collection and processing of personal information in compliance with privacy laws such as Law No. 78-17 of January 6, 1978, relating to data processing, files, and freedoms as well as the GDPR regulations.</p>
                        <p>Under the Data Protection Act of January 6, 1978, the User has the right to access, rectify, delete, and oppose their personal data. The User exercises this right:</p>
                        <p>by email to the email address benoit.cabocel.335@gmail.com</p>
                    </article>
                    <article>
                        <h2>ARTICLE 4: Intellectual Property</h2>
                        <p>The trademarks, logos, signs, as well as all the content of the site (texts, images, sound...) are protected by the Intellectual Property Code and more particularly by copyright.</p>
                        <p>The User must seek the prior authorization of the site for any reproduction, publication, or copying of the various content. They undertake to use the contents of the site strictly for private purposes; any use for commercial and advertising purposes is strictly prohibited.</p>
                        <p>Any total or partial representation of this site by any means whatsoever, without the express authorization of the operator of the Internet site, would constitute an infringement punishable by Article L 335-2 and following of the Intellectual Property Code.</p>
                        <p>It is reminded in accordance with Article L122-5 of the Intellectual Property Code that the User who reproduces, copies, or publishes the protected content must cite the author and their source.</p>
                    </article>
                    <article>
                        <h2>ARTICLE 5: Responsibility</h2>
                        <p>The sources of information published on the benoit-cabocel.fr website are deemed reliable, but the site does not guarantee that it is free from defects, errors, or omissions.</p>
                        <p>The information provided is for indicative and general purposes only and is not contractual. Despite regular updates, the benoit-cabocel.fr site cannot be held responsible for changes in administrative and legal provisions occurring after publication. Similarly, the site cannot be held responsible for the use and interpretation of the information contained on this site.</p>
                        <p>The benoit-cabocel.fr site cannot be held responsible for any viruses that may infect the user&apos;s computer or any other device, following use, access, or downloading from this site.</p>
                        <p>The site&apos;s liability cannot be engaged in the event of force majeure or unforeseeable and insurmountable actions of a third party.</p>
                    </article>
                    <article>
                        <h2>ARTICLE 6: Hyperlinks</h2>
                        <p>Hyperlinks may be present on the site. The User is informed that by clicking on these links, they will leave the benoit-cabocel.fr website. The latter has no control over the web pages to which these links lead and cannot, under any circumstances, be held responsible for their content.</p>
                    </article>
                    <article>
                        <h2>ARTICLE 7: Cookies</h2>
                        <p>The User is informed that during their visits to the site, a cookie may be automatically installed on their browser software.</p>
                        <p>Cookies are small files temporarily stored on the user&apos;s computer&apos;s hard drive by their browser and are necessary for the use of the benoit-cabocel.fr site. Cookies do not contain any personal information and cannot be used to identify anyone. A cookie contains a unique identifier, randomly generated and therefore anonymous. Some cookies expire at the end of the user&apos;s visit, while others remain.</p>
                        <p>The information contained in cookies is used to improve the benoit-cabocel.fr site.</p>
                        <p>By browsing the site, the User accepts them.</p>
                        <p>However, the User must consent to the use of certain cookies.</p>
                        <p>In the event of non-acceptance, the User is informed that certain features or pages may be denied to them.</p>
                        <p>The User may deactivate these cookies through the settings in their browsing software.</p>
                    </article>
                    <article>
                        <h2>ARTICLE 8: Applicable Law and Jurisdiction</h2>
                        <p>French law applies to this contract. In the event of no amicable resolution of a dispute arising between the parties, the French courts shall have sole jurisdiction to hear it.</p>
                        <p>For any questions regarding the application of these Terms of Use, you can contact the publisher using the contact details provided in ARTICLE 1.</p>
                    </article>
                </div>
            </section>
        </main>
    
    );
}

export default Page;