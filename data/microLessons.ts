export type MicroLesson = {
  id: string;
  fr: string;
  en: string;
  example: string;
  audience: "all" | "developer" | "business" | "professional";
};

export const MICRO_LESSONS: MicroLesson[] = [
  { id: "work-on", fr: "Pour parler d'une tâche en cours, dites « I am working on... » et non « I work on... ».", en: "For a task in progress, say “I am working on...” rather than “I work on...”.", example: "I am working on the payment page.", audience: "all" },
  { id: "actually", fr: "« Actually » signifie « en fait », pas « actuellement ».", en: "“Actually” means “in fact,” not the French word “actuellement.”", example: "Actually, the meeting starts at ten.", audience: "all" },
  { id: "issue", fr: "Dans la tech, « issue » désigne souvent un problème ou un ticket à traiter.", en: "In tech, “issue” often means a problem or a ticket to resolve.", example: "We found an issue in the authentication flow.", audience: "developer" },
  { id: "deadline", fr: "Pour demander une échéance : « What is the deadline for this project? »", en: "To ask about a due date: “What is the deadline for this project?”", example: "What is the deadline for this project?", audience: "professional" },
  { id: "follow-up", fr: "« I am following up on... » permet de relancer poliment un client ou collègue.", en: "“I am following up on...” is a polite way to remind a client or colleague.", example: "I am following up on my previous email.", audience: "business" },
  { id: "agree", fr: "On dit « I agree », jamais « I am agree ».", en: "Say “I agree,” never “I am agree.”", example: "I agree with your proposal.", audience: "all" },
  { id: "available", fr: "Pour indiquer votre disponibilité, utilisez « I am available... ».", en: "Use “I am available...” to indicate when you are free.", example: "I am available tomorrow afternoon.", audience: "all" },

  { id: "let-you-know", fr: "« I'll let you know » signifie « je vous tiendrai au courant ».", en: "“I'll let you know” means you will provide information later.", example: "I'll let you know when the update is ready.", audience: "all" },

  { id: "keep-updated", fr: "Utilisez « I'll keep you updated » pour promettre de communiquer l'évolution d'une situation.", en: "Use “I'll keep you updated” when you will continue sharing progress.", example: "I'll keep you updated on the project.", audience: "all" },

  { id: "get-back-to-you", fr: "« I'll get back to you » est une manière professionnelle de dire que vous répondrez plus tard.", en: "“I'll get back to you” is a professional way to say you will respond later.", example: "I'll check with my team and get back to you.", audience: "all" },

  { id: "sounds-good", fr: "« Sounds good » permet d'accepter naturellement une proposition.", en: "Use “Sounds good” to naturally agree with a suggestion.", example: "Tuesday at 10? Sounds good.", audience: "all" },

  { id: "works-for-me", fr: "« That works for me » signifie qu'une heure, une date ou une proposition vous convient.", en: "“That works for me” means a time, date, or suggestion is convenient for you.", example: "Three o'clock works for me.", audience: "all" },

  { id: "looking-forward", fr: "Utilisez « I look forward to... » dans un contexte professionnel pour exprimer votre attente positive.", en: "Use “I look forward to...” to professionally express positive anticipation.", example: "I look forward to working with you.", audience: "all" },

  { id: "looking-forward-ing", fr: "Après « look forward to », utilisez un nom ou un verbe en -ing.", en: "After “look forward to,” use a noun or an -ing verb.", example: "I look forward to meeting you.", audience: "all" },

  { id: "responsible-for", fr: "Utilisez « responsible for » pour expliquer vos responsabilités.", en: "Use “responsible for” to describe your responsibilities.", example: "I am responsible for managing the development team.", audience: "professional" },

  { id: "in-charge-of", fr: "« In charge of » permet d'expliquer ce que vous dirigez ou supervisez.", en: "Use “in charge of” to explain what you manage or supervise.", example: "She is in charge of customer relations.", audience: "professional" },

  { id: "experience-in", fr: "Utilisez « experience in » suivi d'un domaine.", en: "Use “experience in” followed by a field or area.", example: "I have five years of experience in web development.", audience: "all" },

  { id: "experience-with", fr: "Utilisez « experience with » pour parler d'un outil ou d'une technologie.", en: "Use “experience with” when talking about a tool or technology.", example: "I have experience with React and Next.js.", audience: "developer" },

  { id: "specialize-in", fr: "« I specialize in... » est utile pour présenter votre domaine d'expertise.", en: "“I specialize in...” is useful for presenting your area of expertise.", example: "I specialize in building web applications.", audience: "all" },

  { id: "currently", fr: "« Currently » signifie « actuellement ».", en: "“Currently” means “at the present time.”", example: "I am currently working on a mobile application.", audience: "all" },

  { id: "since-for", fr: "Utilisez « since » avec un point de départ et « for » avec une durée.", en: "Use “since” with a starting point and “for” with a duration.", example: "I have worked here for three years.", audience: "all" },

  { id: "been-working", fr: "Pour une activité commencée dans le passé et toujours en cours : « I have been working... ».", en: "Use “I have been working...” for an activity that started in the past and continues now.", example: "I have been working on this project since Monday.", audience: "all" },

  { id: "used-to", fr: "« I used to... » permet de parler d'une ancienne habitude ou situation.", en: "Use “I used to...” for a past habit or situation that is no longer true.", example: "I used to work as a freelance developer.", audience: "all" },

  { id: "based-in", fr: "Utilisez « based in » pour indiquer où vous ou votre entreprise êtes installés.", en: "Use “based in” to indicate where you or your company operates from.", example: "Our company is based in Kinshasa.", audience: "business" },

  { id: "work-with", fr: "Utilisez « work with » pour présenter les personnes ou entreprises avec lesquelles vous travaillez.", en: "Use “work with” to describe the people or companies you collaborate with.", example: "We work with small and medium-sized businesses.", audience: "business" },

  { id: "work-for", fr: "« Work for » indique l'entreprise ou la personne qui vous emploie.", en: "“Work for” identifies the company or person that employs you.", example: "I work for a technology company.", audience: "professional" },

  { id: "work-as", fr: "« Work as » est suivi de votre fonction ou métier.", en: "Use “work as” before your job or professional role.", example: "I work as a software developer.", audience: "professional" },

  { id: "deal-with", fr: "« Deal with » signifie gérer ou s'occuper d'une situation, d'un problème ou de clients.", en: "“Deal with” means to handle a situation, problem, or group of people.", example: "I deal with customer requests every day.", audience: "professional" },

  { id: "handle", fr: "« Handle » est très utilisé pour parler de la gestion d'une tâche ou d'une situation.", en: "“Handle” is commonly used for managing a task or situation.", example: "I can handle this request.", audience: "all" },

  { id: "take-care-of", fr: "« I'll take care of it » signifie que vous allez vous occuper du problème ou de la tâche.", en: "“I'll take care of it” means you will handle the problem or task.", example: "Don't worry, I'll take care of it.", audience: "all" },

  { id: "as-soon-as-possible", fr: "« As soon as possible » signifie « dès que possible ».", en: "“As soon as possible” means at the earliest possible time.", example: "Please send the document as soon as possible.", audience: "all" },

  { id: "by-friday", fr: "Utilisez « by Friday » pour dire « au plus tard vendredi ».", en: "Use “by Friday” to mean no later than Friday.", example: "We need to finish the project by Friday.", audience: "all" },

  { id: "until-friday", fr: "« Until Friday » signifie qu'une situation continue jusqu'à vendredi.", en: "“Until Friday” means something continues up to Friday.", example: "I will be out of the office until Friday.", audience: "professional" },

  { id: "on-time", fr: "« On time » signifie à l'heure prévue.", en: "“On time” means at the scheduled time.", example: "The meeting started on time.", audience: "all" },

  { id: "in-time", fr: "« In time » signifie suffisamment tôt pour éviter d'être trop tard.", en: "“In time” means early enough before it is too late.", example: "We finished the project in time for the launch.", audience: "all" },

  { id: "running-late", fr: "« I'm running late » est une façon naturelle d'annoncer un retard.", en: "“I'm running late” is a natural way to say you will arrive late.", example: "I'm running about ten minutes late.", audience: "all" },

  { id: "reschedule", fr: "« Reschedule » signifie déplacer un rendez-vous à une autre date ou heure.", en: "“Reschedule” means to move an appointment or meeting to another time.", example: "Could we reschedule the meeting for tomorrow?", audience: "all" },

  { id: "schedule-meeting", fr: "Utilisez « schedule a meeting » pour organiser une réunion.", en: "Use “schedule a meeting” when arranging a meeting.", example: "Can we schedule a meeting for next week?", audience: "all" },

  { id: "set-up-meeting", fr: "« Set up a meeting » est une autre façon naturelle d'organiser une réunion.", en: "“Set up a meeting” is another natural way to arrange a meeting.", example: "Let's set up a meeting with the client.", audience: "business" },

  { id: "cancel-meeting", fr: "« Cancel a meeting » signifie annuler une réunion.", en: "“Cancel a meeting” means to call off a planned meeting.", example: "We had to cancel today's meeting.", audience: "all" },

  { id: "join-meeting", fr: "On dit « join the meeting », sans « to ».", en: "Say “join the meeting,” without “to.”", example: "I'll join the meeting at 9 a.m.", audience: "all" },

  { id: "attend-meeting", fr: "« Attend a meeting » signifie assister à une réunion.", en: "“Attend a meeting” means to be present at a meeting.", example: "I won't be able to attend the meeting.", audience: "professional" },

  { id: "meeting-agenda", fr: "« Agenda » désigne l'ordre du jour d'une réunion.", en: "An “agenda” is the list of topics to be discussed in a meeting.", example: "I'll send you the meeting agenda.", audience: "professional" },

  { id: "bring-up", fr: "« Bring up » signifie introduire un sujet dans une discussion.", en: "“Bring up” means to introduce a topic for discussion.", example: "I'd like to bring up an important issue.", audience: "all" },

  { id: "point-out", fr: "« Point out » permet d'attirer l'attention sur un élément important.", en: "Use “point out” to draw attention to something important.", example: "I'd like to point out one potential risk.", audience: "all" },

  { id: "clarify", fr: "Utilisez « clarify » lorsque vous voulez rendre une information plus claire.", en: "Use “clarify” when you want to make information clearer.", example: "Could you clarify what you mean?", audience: "all" },

  { id: "could-you-repeat", fr: "Demandez poliment de répéter avec « Could you repeat that, please? ».", en: "Politely ask someone to repeat with “Could you repeat that, please?”", example: "Sorry, could you repeat that, please?", audience: "all" },

  { id: "didnt-catch", fr: "« I didn't catch that » est une manière naturelle de dire que vous n'avez pas compris ou entendu.", en: "“I didn't catch that” naturally indicates that you did not hear or understand something.", example: "Sorry, I didn't catch that. Could you say it again?", audience: "all" },

  { id: "what-do-you-mean", fr: "« What do you mean by...? » permet de demander une explication.", en: "Use “What do you mean by...?” to ask for clarification.", example: "What do you mean by 'final version'?", audience: "all" },

  { id: "if-i-understand", fr: "Utilisez « If I understand correctly... » pour vérifier votre compréhension.", en: "Use “If I understand correctly...” to confirm your understanding.", example: "If I understand correctly, you need the website by Monday.", audience: "all" },

  { id: "in-other-words", fr: "« In other words » permet de reformuler une idée.", en: "Use “in other words” to restate an idea more clearly.", example: "In other words, we need to reduce the cost.", audience: "all" },

  { id: "from-my-understanding", fr: "Préférez « My understanding is that... » à une traduction littérale de « selon ma compréhension ».", en: "Use “My understanding is that...” to professionally explain how you understand a situation.", example: "My understanding is that the client approved the design.", audience: "professional" },

  { id: "make-sure", fr: "« Make sure » signifie vérifier ou s'assurer que quelque chose est fait.", en: "“Make sure” means to ensure that something happens or is correct.", example: "Please make sure the file is uploaded.", audience: "all" },

  { id: "double-check", fr: "« Double-check » signifie vérifier une seconde fois.", en: "“Double-check” means to verify something again.", example: "Let me double-check the figures.", audience: "all" },

  { id: "check-with", fr: "« Check with someone » signifie consulter une personne avant de répondre ou décider.", en: "“Check with someone” means to consult them before responding or deciding.", example: "Let me check with my manager first.", audience: "professional" },

  { id: "confirm", fr: "Utilisez « confirm » pour demander ou donner une confirmation.", en: "Use “confirm” when asking for or providing verification.", example: "Could you confirm the meeting time?", audience: "all" },

  { id: "as-discussed", fr: "« As discussed » permet de faire référence à une conversation précédente.", en: "Use “as discussed” to refer to a previous conversation.", example: "As discussed, I have attached the proposal.", audience: "business" },

  { id: "as-mentioned", fr: "« As mentioned earlier » permet de rappeler poliment une information.", en: "Use “as mentioned earlier” to politely refer back to information.", example: "As mentioned earlier, the project will take six weeks.", audience: "all" },

  { id: "regarding", fr: "« Regarding » signifie « concernant » et est utile dans les communications professionnelles.", en: "“Regarding” means “concerning” and is useful in professional communication.", example: "I'm contacting you regarding your request.", audience: "professional" },

  { id: "concerning", fr: "« Concerning » peut introduire le sujet d'un message professionnel.", en: "“Concerning” can introduce the subject of a professional message.", example: "I have a question concerning the contract.", audience: "business" },

  { id: "attached", fr: "Dans un email, utilisez « Please find attached... » ou plus simplement « I've attached... ».", en: "In emails, use “Please find attached...” or the more natural “I've attached...”.", example: "I've attached the latest version of the report.", audience: "all" },

  { id: "attachment", fr: "« Attachment » désigne un fichier joint à un email.", en: "An “attachment” is a file included with an email.", example: "Please see the attachment for more details.", audience: "professional" },

  { id: "forward-email", fr: "« Forward an email » signifie transférer un email.", en: "“Forward an email” means to send a received email to another person.", example: "Could you forward the email to me?", audience: "professional" },

  { id: "cc-someone", fr: "« CC someone » signifie mettre une personne en copie d'un email.", en: "To “CC someone” means to include them as a copied recipient of an email.", example: "Please CC me on the email.", audience: "professional" },

  { id: "reach-out", fr: "« Reach out to someone » signifie contacter quelqu'un.", en: "“Reach out to someone” means to contact them.", example: "Feel free to reach out if you have any questions.", audience: "all" },

  { id: "feel-free", fr: "« Feel free to... » permet d'inviter poliment quelqu'un à faire quelque chose.", en: "Use “feel free to...” to politely invite someone to do something.", example: "Feel free to contact me anytime.", audience: "all" },

  { id: "dont-hesitate", fr: "« Don't hesitate to... » est une formule professionnelle pour inviter quelqu'un à vous contacter.", en: "“Don't hesitate to...” is a professional way to invite someone to contact you.", example: "Don't hesitate to contact us if you need assistance.", audience: "business" },

  { id: "thanks-for-reaching-out", fr: "Utilisez « Thanks for reaching out » pour remercier quelqu'un de vous avoir contacté.", en: "Use “Thanks for reaching out” to thank someone for contacting you.", example: "Thanks for reaching out. I'd be happy to discuss your project.", audience: "business" },

  { id: "thanks-for-update", fr: "« Thanks for the update » est utile lorsqu'un collègue vous informe d'une évolution.", en: "Use “Thanks for the update” when someone shares new information.", example: "Thanks for the update. I'll review it today.", audience: "all" },

  { id: "appreciate", fr: "« I appreciate... » permet de remercier de manière professionnelle.", en: "Use “I appreciate...” to express professional gratitude.", example: "I appreciate your help with this project.", audience: "all" },

  { id: "would-appreciate", fr: "« I would appreciate it if... » permet de formuler une demande très poliment.", en: "Use “I would appreciate it if...” to make a polite request.", example: "I would appreciate it if you could send the document today.", audience: "professional" },

  { id: "could-you", fr: "« Could you...? » est généralement plus poli que « Can you...? » pour une demande professionnelle.", en: "“Could you...?” is generally more polite than “Can you...?” for professional requests.", example: "Could you send me the updated file?", audience: "all" },

  { id: "would-you-mind", fr: "« Would you mind + -ing » permet de formuler une demande polie.", en: "Use “Would you mind + -ing” for a polite request.", example: "Would you mind sending me the link?", audience: "all" },

  { id: "would-it-be-possible", fr: "« Would it be possible to...? » permet de demander quelque chose avec diplomatie.", en: "Use “Would it be possible to...?” to make a diplomatic request.", example: "Would it be possible to extend the deadline?", audience: "business" },

  { id: "proposal", fr: "« Proposal » désigne une proposition structurée, souvent commerciale.", en: "A “proposal” is a structured suggestion or business offer.", example: "I'll send you our proposal this afternoon.", audience: "business" },

  { id: "quote", fr: "Dans le business, « quote » peut désigner un devis.", en: "In business, a “quote” can mean a price estimate.", example: "Could you send me a quote for the project?", audience: "business" },

  { id: "quotation", fr: "« Quotation » est une forme plus formelle pour parler d'un devis.", en: "“Quotation” is a more formal term for a price estimate.", example: "Please find our quotation attached.", audience: "business" },

  { id: "invoice", fr: "« Invoice » signifie facture.", en: "An “invoice” is a document requesting payment for goods or services.", example: "We sent the invoice yesterday.", audience: "business" },

  { id: "payment-due", fr: "« Payment is due... » indique la date à laquelle un paiement doit être effectué.", en: "“Payment is due...” indicates when payment must be made.", example: "Payment is due within 30 days.", audience: "business" },

  { id: "upfront-payment", fr: "« Upfront payment » désigne un paiement effectué avant le début du travail.", en: "An “upfront payment” is money paid before work begins.", example: "We require a 50% upfront payment.", audience: "business" },

  { id: "deposit", fr: "« Deposit » peut désigner un acompte versé avant une prestation.", en: "A “deposit” can be an initial payment made before a service is delivered.", example: "A 30% deposit is required to start the project.", audience: "business" },

  { id: "budget", fr: "Utilisez « What's your budget? » pour demander le budget disponible.", en: "Use “What's your budget?” to ask how much money is available.", example: "What is your budget for this project?", audience: "business" },

  { id: "within-budget", fr: "« Within budget » signifie respecter le budget prévu.", en: "“Within budget” means not exceeding the planned amount of money.", example: "We completed the project within budget.", audience: "business" },

  { id: "over-budget", fr: "« Over budget » signifie dépasser le budget prévu.", en: "“Over budget” means exceeding the planned budget.", example: "The project is currently over budget.", audience: "business" },

  { id: "cost-effective", fr: "« Cost-effective » décrit une solution efficace par rapport à son coût.", en: "“Cost-effective” describes something that provides good value for its cost.", example: "This is a more cost-effective solution.", audience: "business" },

  { id: "affordable", fr: "« Affordable » signifie financièrement accessible.", en: "“Affordable” means reasonably priced and financially accessible.", example: "We provide affordable solutions for small businesses.", audience: "business" },

  { id: "pricing", fr: "« Pricing » désigne la structure ou stratégie des prix.", en: "“Pricing” refers to how products or services are priced.", example: "You can find our pricing on the website.", audience: "business" },

  { id: "discount", fr: "« Discount » signifie réduction de prix.", en: "A “discount” is a reduction in price.", example: "We offer a discount for annual subscriptions.", audience: "business" },

  { id: "negotiate", fr: "« Negotiate » signifie négocier les conditions d'un accord.", en: "“Negotiate” means to discuss terms in order to reach an agreement.", example: "We can negotiate the payment terms.", audience: "business" },

  { id: "terms", fr: "Dans le business, « terms » désigne les conditions d'un accord.", en: "In business, “terms” are the conditions of an agreement.", example: "Let's discuss the terms of the contract.", audience: "business" },

  { id: "deal", fr: "« Deal » peut désigner un accord commercial.", en: "A “deal” can refer to a business agreement.", example: "We finally closed the deal.", audience: "business" },

  { id: "close-deal", fr: "« Close a deal » signifie finaliser avec succès un accord ou une vente.", en: "“Close a deal” means to successfully finalize a business agreement or sale.", example: "We hope to close the deal this week.", audience: "business" },

  { id: "make-an-offer", fr: "« Make an offer » signifie faire une proposition commerciale.", en: "“Make an offer” means to propose a price or business arrangement.", example: "We'd like to make you an offer.", audience: "business" },

  { id: "counteroffer", fr: "« Counteroffer » désigne une contre-proposition.", en: "A “counteroffer” is an alternative offer made in response to an initial offer.", example: "The client made a counteroffer.", audience: "business" },

  { id: "partnership", fr: "« Partnership » désigne une collaboration structurée entre deux parties.", en: "A “partnership” is a collaborative business relationship.", example: "We're looking for long-term partnerships.", audience: "business" },

  { id: "partner-with", fr: "« Partner with » signifie établir une collaboration avec une personne ou entreprise.", en: "“Partner with” means to collaborate with a person or company.", example: "We would like to partner with your company.", audience: "business" },

  { id: "target-market", fr: "« Target market » désigne le marché ou groupe de clients visé.", en: "A “target market” is the group of customers a business aims to serve.", example: "Small businesses are our primary target market.", audience: "business" },

  { id: "target-audience", fr: "« Target audience » désigne le public qu'un contenu, produit ou service cherche à atteindre.", en: "A “target audience” is the specific group a message, product, or service aims to reach.", example: "Our target audience is French-speaking professionals.", audience: "business" },

  { id: "customer-needs", fr: "« Customer needs » désigne les besoins des clients.", en: "“Customer needs” are the problems or requirements customers want addressed.", example: "We designed the service around customer needs.", audience: "business" },

  { id: "pain-point", fr: "« Pain point » désigne un problème précis rencontré par un client.", en: "A “pain point” is a specific problem experienced by a customer.", example: "Slow internet is a major pain point for our customers.", audience: "business" },

  { id: "value-proposition", fr: "« Value proposition » explique pourquoi un client devrait choisir votre offre.", en: "A “value proposition” explains why a customer should choose your product or service.", example: "Our value proposition is simple: fast service at an affordable price.", audience: "business" },

  { id: "competitive-advantage", fr: "« Competitive advantage » désigne un avantage sur les concurrents.", en: "A “competitive advantage” is something that gives a business an edge over competitors.", example: "Customer support is one of our competitive advantages.", audience: "business" },

  { id: "revenue", fr: "« Revenue » désigne le chiffre d'affaires, pas nécessairement le bénéfice.", en: "“Revenue” is the money generated by a business before expenses are deducted.", example: "Our monthly revenue increased by 20%.", audience: "business" },

  { id: "profit", fr: "« Profit » désigne le bénéfice restant après les dépenses.", en: "“Profit” is the money remaining after expenses are deducted.", example: "The company made a profit this quarter.", audience: "business" },

  { id: "expenses", fr: "« Expenses » signifie dépenses.", en: "“Expenses” are the costs incurred by a person or business.", example: "We need to reduce our operating expenses.", audience: "business" },

  { id: "cash-flow", fr: "« Cash flow » désigne les mouvements d'argent entrants et sortants d'une entreprise.", en: "“Cash flow” refers to money moving into and out of a business.", example: "We need to improve our cash flow.", audience: "business" },

  { id: "break-even", fr: "« Break even » signifie atteindre le point où les revenus couvrent les coûts.", en: "“Break even” means reaching the point where revenue covers costs.", example: "We expect to break even within six months.", audience: "business" },

  { id: "scale-business", fr: "« Scale a business » signifie développer une entreprise de manière structurée.", en: "“Scale a business” means to grow it while increasing its capacity.", example: "We're looking for investment to scale the business.", audience: "business" },

  { id: "launch-product", fr: "« Launch a product » signifie lancer un produit sur le marché.", en: "“Launch a product” means to introduce it to the market.", example: "We're launching our new product next month.", audience: "business" },

  { id: "roll-out", fr: "« Roll out » signifie déployer progressivement un produit ou une fonctionnalité.", en: "“Roll out” means to introduce a product, service, or feature gradually.", example: "We're rolling out the new service next week.", audience: "business" },

  { id: "feedback", fr: "« Feedback » désigne un retour ou avis destiné à améliorer quelque chose.", en: "“Feedback” is information or an opinion given to help improve something.", example: "We'd appreciate your feedback.", audience: "all" },

  { id: "give-feedback", fr: "On dit « give feedback », et non « make feedback ».", en: "Say “give feedback,” not “make feedback.”", example: "Could you give me some feedback on the presentation?", audience: "all" },

  { id: "implement-feedback", fr: "« Implement feedback » signifie appliquer les améliorations suggérées.", en: "“Implement feedback” means to make changes based on suggestions received.", example: "We've implemented the client's feedback.", audience: "developer" },

  { id: "requirements", fr: "En développement, « requirements » désigne les besoins et exigences du projet.", en: "In development, “requirements” are the needs and conditions a project must satisfy.", example: "We need to clarify the project requirements.", audience: "developer" },

  { id: "specifications", fr: "« Specifications » désigne les caractéristiques détaillées d'un projet ou produit.", en: "“Specifications” are detailed requirements for a project or product.", example: "I've reviewed the technical specifications.", audience: "developer" },

  { id: "feature", fr: "« Feature » signifie fonctionnalité dans le contexte d'un produit logiciel.", en: "A “feature” is a specific function or capability of a software product.", example: "We're adding a new payment feature.", audience: "developer" },

  { id: "new-feature", fr: "Utilisez « build/add/implement a feature » pour parler du développement d'une fonctionnalité.", en: "Use “build,” “add,” or “implement a feature” when discussing feature development.", example: "We're implementing a new search feature.", audience: "developer" },

  { id: "bug", fr: "« Bug » désigne une erreur dans un logiciel.", en: "A “bug” is an error or defect in software.", example: "We found a bug in the checkout process.", audience: "developer" },

  { id: "fix-bug", fr: "On dit « fix a bug » pour corriger un bug.", en: "Use “fix a bug” when correcting a software defect.", example: "I'm fixing a bug in the login page.", audience: "developer" },

  { id: "debug", fr: "« Debug » signifie rechercher et corriger les causes d'un problème logiciel.", en: "“Debug” means to identify and fix the cause of a software problem.", example: "I'm debugging the authentication service.", audience: "developer" },

  { id: "error-message", fr: "« Error message » désigne le message affiché lorsqu'une erreur se produit.", en: "An “error message” is displayed when something goes wrong.", example: "What error message are you getting?", audience: "developer" },

  { id: "reproduce-bug", fr: "« Reproduce a bug » signifie réussir à provoquer le même problème pour l'étudier.", en: "“Reproduce a bug” means to recreate the same problem so it can be investigated.", example: "I can't reproduce the bug on my machine.", audience: "developer" },

  { id: "on-my-machine", fr: "« On my machine » signifie sur votre propre ordinateur ou environnement local.", en: "“On my machine” refers to your own computer or local environment.", example: "It works correctly on my machine.", audience: "developer" },

  { id: "environment", fr: "En développement, « environment » peut désigner l'environnement local, test ou production.", en: "In development, an “environment” can be local, testing, staging, or production.", example: "The issue only occurs in the production environment.", audience: "developer" },

  { id: "production", fr: "« Production » désigne l'environnement utilisé par les vrais utilisateurs.", en: "“Production” is the live environment used by real users.", example: "The new version is now in production.", audience: "developer" },

  { id: "staging", fr: "« Staging » est un environnement proche de la production utilisé pour tester.", en: "“Staging” is a production-like environment used for testing.", example: "Let's test the feature in staging first.", audience: "developer" },

  { id: "deploy", fr: "« Deploy » signifie déployer une application ou une nouvelle version.", en: "“Deploy” means to release software to an environment.", example: "We're deploying the update tonight.", audience: "developer" },

  { id: "deployment", fr: "« Deployment » désigne le processus de déploiement d'un logiciel.", en: "“Deployment” is the process of releasing software.", example: "The deployment was successful.", audience: "developer" },

  { id: "release", fr: "« Release » peut désigner une version publiée d'un logiciel.", en: "A “release” is a version of software made available for use.", example: "The next release is scheduled for Friday.", audience: "developer" },

  { id: "update", fr: "« Update » peut être un nom ou un verbe pour parler d'une mise à jour.", en: "“Update” can be a noun or verb when referring to new changes or information.", example: "We need to update the application.", audience: "developer" },

  { id: "upgrade", fr: "« Upgrade » désigne généralement le passage vers une version ou capacité supérieure.", en: "“Upgrade” generally means moving to a newer or more capable version.", example: "We need to upgrade the database server.", audience: "developer" },

  { id: "source-code", fr: "« Source code » signifie code source.", en: "“Source code” is the human-readable code used to build software.", example: "The source code is available on GitHub.", audience: "developer" },

  { id: "codebase", fr: "« Codebase » désigne l'ensemble du code source d'un projet.", en: "A “codebase” is the complete collection of source code for a project.", example: "I'm still learning the codebase.", audience: "developer" },

  { id: "repository", fr: "« Repository » ou « repo » désigne l'emplacement où le code d'un projet est stocké.", en: "A “repository,” or “repo,” stores a project's code and version history.", example: "I've pushed the changes to the repository.", audience: "developer" },

  { id: "commit", fr: "Un « commit » enregistre un ensemble de modifications dans Git.", en: "A “commit” records a set of changes in Git.", example: "I made a commit with the latest changes.", audience: "developer" },

  { id: "push-changes", fr: "« Push the changes » signifie envoyer vos commits vers le dépôt distant.", en: "“Push the changes” means to send your commits to the remote repository.", example: "I'll push the changes this afternoon.", audience: "developer" },

  { id: "pull-latest", fr: "« Pull the latest changes » signifie récupérer les modifications récentes du dépôt.", en: "“Pull the latest changes” means to retrieve recent changes from the remote repository.", example: "Please pull the latest changes before you start.", audience: "developer" },

  { id: "branch", fr: "Une « branch » est une branche de développement Git.", en: "A “branch” is an independent line of development in Git.", example: "Create a new branch for this feature.", audience: "developer" },

  { id: "merge", fr: "« Merge » signifie fusionner des modifications ou branches.", en: "“Merge” means to combine changes or branches.", example: "We can merge this branch after the review.", audience: "developer" },

  { id: "merge-conflict", fr: "« Merge conflict » désigne un conflit que Git ne peut pas résoudre automatiquement.", en: "A “merge conflict” occurs when Git cannot automatically combine changes.", example: "I need to resolve a merge conflict.", audience: "developer" },

  { id: "pull-request", fr: "Une « pull request » propose des modifications afin qu'elles soient examinées avant fusion.", en: "A “pull request” proposes code changes for review before merging.", example: "I've opened a pull request.", audience: "developer" },

  { id: "code-review", fr: "« Code review » désigne l'examen du code par d'autres développeurs.", en: "A “code review” is the process of examining another developer's code.", example: "Could you review my code?", audience: "developer" },

  { id: "review-changes", fr: "« Review the changes » signifie examiner les modifications apportées.", en: "“Review the changes” means to examine modifications that have been made.", example: "Can you review these changes before we merge them?", audience: "developer" },

  { id: "approve-pr", fr: "« Approve a pull request » signifie valider les modifications proposées.", en: "“Approve a pull request” means to accept the proposed code changes.", example: "I've reviewed and approved the pull request.", audience: "developer" },

  { id: "refactor", fr: "« Refactor » signifie restructurer le code sans modifier son comportement attendu.", en: "“Refactor” means to restructure code without changing its intended behavior.", example: "We should refactor this component.", audience: "developer" },

  { id: "clean-code", fr: "« Clean code » désigne un code lisible, organisé et maintenable.", en: "“Clean code” is code that is readable, organized, and maintainable.", example: "We want to keep the code clean and maintainable.", audience: "developer" },

  { id: "maintainable", fr: "« Maintainable » décrit un logiciel facile à comprendre, modifier et maintenir.", en: "“Maintainable” describes software that is easy to understand, modify, and support.", example: "We need a more maintainable solution.", audience: "developer" },

  { id: "scalable", fr: "« Scalable » décrit un système capable de supporter une croissance importante.", en: "“Scalable” describes a system that can handle growth effectively.", example: "We need to build a scalable architecture.", audience: "developer" },

  { id: "performance", fr: "« Performance » désigne notamment la rapidité et l'efficacité d'un système.", en: "“Performance” refers to how efficiently and quickly a system operates.", example: "We're working on improving application performance.", audience: "developer" },

  { id: "slow-down", fr: "« Slow down » signifie ralentir.", en: "“Slow down” means to become or make something slower.", example: "This query is slowing down the application.", audience: "developer" },

  { id: "load-time", fr: "« Load time » désigne le temps nécessaire au chargement.", en: "“Load time” is the amount of time needed for something to load.", example: "We reduced the page load time.", audience: "developer" },

  { id: "database-query", fr: "« Database query » signifie requête de base de données.", en: "A “database query” is a request to retrieve or manipulate database information.", example: "This database query is taking too long.", audience: "developer" },

  { id: "api-endpoint", fr: "Un « API endpoint » est un point d'accès spécifique d'une API.", en: "An “API endpoint” is a specific access point provided by an API.", example: "This endpoint returns the user's profile.", audience: "developer" },

  { id: "request-response", fr: "Dans une API, on parle souvent de « request » et « response ».", en: "APIs commonly involve a “request” sent by a client and a “response” returned by a server.", example: "The server returns a response after receiving the request.", audience: "developer" },

  { id: "frontend", fr: "« Frontend » désigne la partie d'une application avec laquelle l'utilisateur interagit.", en: "“Frontend” refers to the user-facing part of an application.", example: "I mainly work on frontend development.", audience: "developer" },

  { id: "backend", fr: "« Backend » désigne la logique serveur et les systèmes derrière l'interface.", en: "“Backend” refers to server-side logic and systems behind an interface.", example: "The backend is built with Node.js.", audience: "developer" },

  { id: "full-stack", fr: "Un « full-stack developer » travaille à la fois sur le frontend et le backend.", en: "A “full-stack developer” works on both frontend and backend development.", example: "I work as a full-stack developer.", audience: "developer" },

  { id: "user-interface", fr: "« User interface » ou UI désigne les éléments visuels avec lesquels l'utilisateur interagit.", en: "A “user interface,” or UI, is the visual part users interact with.", example: "We're redesigning the user interface.", audience: "developer" },

  { id: "user-experience", fr: "« User experience » ou UX concerne l'expérience globale d'utilisation d'un produit.", en: "“User experience,” or UX, concerns the overall experience of using a product.", example: "We want to improve the user experience.", audience: "developer" },

  { id: "responsive", fr: "Un site « responsive » s'adapte à différentes tailles d'écran.", en: "A “responsive” website adapts to different screen sizes.", example: "The website is fully responsive.", audience: "developer" },

  { id: "mobile-friendly", fr: "« Mobile-friendly » décrit un site facile à utiliser sur smartphone.", en: "“Mobile-friendly” describes a website that works well on mobile devices.", example: "We need to make the website more mobile-friendly.", audience: "developer" },

  { id: "authentication", fr: "« Authentication » est le processus permettant de vérifier l'identité d'un utilisateur.", en: "“Authentication” is the process of verifying a user's identity.", example: "We're implementing user authentication.", audience: "developer" },

  { id: "authorization", fr: "« Authorization » détermine ce qu'un utilisateur authentifié a le droit de faire.", en: "“Authorization” determines what an authenticated user is allowed to do.", example: "The problem is related to authorization.", audience: "developer" },

  { id: "credentials", fr: "« Credentials » désigne les informations utilisées pour s'authentifier.", en: "“Credentials” are information used to authenticate a user or system.", example: "Never share your login credentials.", audience: "developer" },

  { id: "security-vulnerability", fr: "« Security vulnerability » désigne une faiblesse pouvant compromettre la sécurité.", en: "A “security vulnerability” is a weakness that could compromise security.", example: "We discovered a security vulnerability.", audience: "developer" },

  { id: "backup", fr: "« Backup » signifie sauvegarde.", en: "A “backup” is a copy of data kept for recovery.", example: "We create a database backup every day.", audience: "developer" },

  { id: "downtime", fr: "« Downtime » désigne une période pendant laquelle un service est indisponible.", en: "“Downtime” is a period when a system or service is unavailable.", example: "The deployment caused five minutes of downtime.", audience: "developer" },

  { id: "server-down", fr: "« The server is down » signifie que le serveur ne fonctionne pas ou est indisponible.", en: "“The server is down” means the server is unavailable or not functioning.", example: "The website is unavailable because the server is down.", audience: "developer" },

  { id: "up-and-running", fr: "« Up and running » signifie qu'un système fonctionne correctement.", en: "“Up and running” means a system is operational.", example: "The server is back up and running.", audience: "developer" },

  { id: "stand-up", fr: "Un « stand-up » est une courte réunion d'équipe, fréquente dans les équipes tech.", en: "A “stand-up” is a short team meeting commonly used by development teams.", example: "We have a stand-up every morning.", audience: "developer" },

  { id: "working-on-today", fr: "En stand-up, utilisez « Today, I'm working on... » pour présenter votre tâche.", en: "In a stand-up, use “Today, I'm working on...” to describe your current task.", example: "Today, I'm working on the authentication flow.", audience: "developer" },

  { id: "finished-yesterday", fr: "« Yesterday, I finished... » permet de résumer le travail terminé.", en: "Use “Yesterday, I finished...” to summarize completed work.", example: "Yesterday, I finished the dashboard.", audience: "developer" },

  { id: "blocked-by", fr: "« I'm blocked by... » permet d'expliquer ce qui empêche votre progression.", en: "Use “I'm blocked by...” to explain what is preventing progress.", example: "I'm currently blocked by an API issue.", audience: "developer" },

  { id: "blocker", fr: "Un « blocker » est un problème qui empêche une tâche d'avancer.", en: "A “blocker” is a problem preventing work from progressing.", example: "I don't have any blockers today.", audience: "developer" },

  { id: "task", fr: "« Task » signifie tâche.", en: "A “task” is a specific piece of work to be completed.", example: "I've completed the first task.", audience: "all" },

  { id: "assign-task", fr: "« Assign a task » signifie attribuer une tâche à quelqu'un.", en: "“Assign a task” means to give someone responsibility for a piece of work.", example: "I'll assign this task to David.", audience: "professional" },

  { id: "complete-task", fr: "« Complete a task » signifie terminer une tâche.", en: "“Complete a task” means to finish a piece of work.", example: "I completed the task this morning.", audience: "all" },

  { id: "pending", fr: "« Pending » indique que quelque chose est encore en attente.", en: "“Pending” means something is still waiting to be completed or decided.", example: "The client's approval is still pending.", audience: "all" },

  { id: "in-progress", fr: "« In progress » signifie qu'un travail est en cours.", en: "“In progress” means work has started but is not yet complete.", example: "The redesign is currently in progress.", audience: "all" },

  { id: "completed", fr: "« Completed » signifie terminé.", en: "“Completed” means fully finished.", example: "The project has been completed.", audience: "all" },

  { id: "priority", fr: "« Priority » désigne le niveau d'importance d'une tâche.", en: "“Priority” refers to how important or urgent a task is.", example: "This task is our top priority.", audience: "all" },

  { id: "high-priority", fr: "« High priority » désigne une tâche importante à traiter rapidement.", en: "“High priority” describes something that requires significant or immediate attention.", example: "This is a high-priority issue.", audience: "all" },

  { id: "urgent", fr: "« Urgent » signifie qu'une action rapide est nécessaire.", en: "“Urgent” means requiring immediate attention.", example: "This request is urgent.", audience: "all" },

  { id: "workload", fr: "« Workload » désigne la quantité de travail à effectuer.", en: "“Workload” is the amount of work a person or team has.", example: "My workload is quite heavy this week.", audience: "professional" },

  { id: "manage-workload", fr: "« Manage your workload » signifie organiser efficacement sa charge de travail.", en: "“Manage your workload” means to organize your amount of work effectively.", example: "I need to manage my workload more effectively.", audience: "professional" },

  { id: "progress", fr: "« Progress » est généralement indénombrable : on dit « make progress ».", en: "“Progress” is generally uncountable: say “make progress.”", example: "We're making good progress.", audience: "all" },

  { id: "make-progress", fr: "On dit « make progress », et non « do progress ».", en: "Say “make progress,” not “do progress.”", example: "We've made significant progress this week.", audience: "all" },

  { id: "status-update", fr: "« Status update » est un point sur l'état d'avancement d'un travail.", en: "A “status update” provides current information about the progress of work.", example: "Could you give me a status update?", audience: "professional" },

  { id: "on-track", fr: "« On track » signifie qu'un projet avance comme prévu.", en: "“On track” means a project is progressing according to plan.", example: "We're on track to finish by Friday.", audience: "all" },

  { id: "behind-schedule", fr: "« Behind schedule » signifie qu'un projet est en retard sur le planning.", en: "“Behind schedule” means work is progressing more slowly than planned.", example: "We're two weeks behind schedule.", audience: "all" },

  { id: "ahead-of-schedule", fr: "« Ahead of schedule » signifie qu'un projet avance plus vite que prévu.", en: "“Ahead of schedule” means work is progressing faster than planned.", example: "We're currently ahead of schedule.", audience: "all" },

  { id: "meet-deadline", fr: "« Meet a deadline » signifie respecter une échéance.", en: "“Meet a deadline” means to complete something by the required time.", example: "We need to work faster to meet the deadline.", audience: "all" },

  { id: "miss-deadline", fr: "« Miss a deadline » signifie ne pas respecter une échéance.", en: "“Miss a deadline” means failing to complete something by the required time.", example: "We don't want to miss the deadline.", audience: "all" },

  { id: "extend-deadline", fr: "« Extend the deadline » signifie repousser l'échéance.", en: "“Extend the deadline” means to allow more time for completion.", example: "Could we extend the deadline by one week?", audience: "all" },

  { id: "estimate", fr: "« Estimate » désigne une estimation de durée, coût ou effort.", en: "An “estimate” is an approximate calculation of time, cost, or effort.", example: "Can you give me an estimate for this project?", audience: "all" },

  { id: "take-two-days", fr: "Utilisez « It will take... » pour estimer la durée nécessaire.", en: "Use “It will take...” to estimate how much time something requires.", example: "It will take about two days to complete.", audience: "all" },

  { id: "need-more-time", fr: "« I need more time » est une manière simple et professionnelle d'indiquer qu'un délai est insuffisant.", en: "“I need more time” is a clear way to say the current timeframe is insufficient.", example: "I need more time to test the application properly.", audience: "all" },

  { id: "deliver", fr: "Dans un contexte professionnel, « deliver » signifie fournir ou terminer ce qui a été promis.", en: "In professional contexts, “deliver” means to provide or complete what was promised.", example: "We can deliver the first version next week.", audience: "all" },

  { id: "deliverable", fr: "Un « deliverable » est un résultat concret attendu dans un projet.", en: "A “deliverable” is a specific output expected from a project.", example: "The prototype is our first deliverable.", audience: "professional" },

  { id: "milestone", fr: "Un « milestone » est une étape importante d'un projet.", en: "A “milestone” is a significant stage in a project.", example: "We've reached an important project milestone.", audience: "professional" },

  { id: "scope", fr: "« Scope » désigne le périmètre d'un projet.", en: "“Scope” refers to what is and is not included in a project.", example: "This feature is outside the project scope.", audience: "all" },

  { id: "out-of-scope", fr: "« Out of scope » signifie qu'une demande n'est pas comprise dans le périmètre convenu.", en: "“Out of scope” means a request is not included in the agreed project boundaries.", example: "That request is currently out of scope.", audience: "business" },

  { id: "change-request", fr: "« Change request » désigne une demande formelle de modification d'un projet.", en: "A “change request” is a formal request to modify project requirements.", example: "The client submitted a change request.", audience: "business" },

  { id: "project-plan", fr: "« Project plan » désigne le plan détaillant l'exécution d'un projet.", en: "A “project plan” outlines how a project will be executed.", example: "Let's review the project plan.", audience: "professional" },

  { id: "next-step", fr: "« What's the next step? » permet de demander ce qu'il faut faire ensuite.", en: "Use “What's the next step?” to ask what should happen next.", example: "We've approved the proposal. What's the next step?", audience: "all" },

  { id: "next-steps", fr: "« Next steps » est très utilisé pour présenter les actions à venir.", en: "“Next steps” is commonly used to describe upcoming actions.", example: "Let's discuss the next steps.", audience: "all" },

  { id: "action-items", fr: "« Action items » désigne les tâches décidées à la suite d'une réunion.", en: "“Action items” are specific tasks assigned after a discussion or meeting.", example: "I'll send the action items after the meeting.", audience: "professional" },

  { id: "take-notes", fr: "On dit « take notes » pour prendre des notes.", en: "Say “take notes” for writing down important information.", example: "I'll take notes during the meeting.", audience: "professional" },

  { id: "minutes", fr: "« Meeting minutes » désigne le compte rendu officiel d'une réunion.", en: "“Meeting minutes” are the official written record of a meeting.", example: "I'll share the meeting minutes this afternoon.", audience: "professional" },

  { id: "presentation", fr: "On dit « give a presentation » ou « make a presentation », selon le contexte, mais « give » est très courant pour l'action de présenter.", en: "“Give a presentation” is a common expression for presenting information to an audience.", example: "I'm giving a presentation tomorrow.", audience: "professional" },

  { id: "walk-you-through", fr: "« Let me walk you through... » signifie expliquer quelque chose étape par étape.", en: "“Let me walk you through...” means to explain something step by step.", example: "Let me walk you through the new dashboard.", audience: "all" },

  { id: "overview", fr: "« Overview » signifie vue d'ensemble.", en: "An “overview” is a general summary of a subject.", example: "I'll start with a quick overview of the project.", audience: "all" },

  { id: "key-point", fr: "« Key point » signifie point essentiel.", en: "A “key point” is an important idea or piece of information.", example: "Let me highlight three key points.", audience: "all" },

  { id: "highlight", fr: "« Highlight » signifie mettre en évidence un élément important.", en: "“Highlight” means to emphasize something important.", example: "I'd like to highlight our main results.", audience: "all" },

  { id: "according-to", fr: "« According to... » permet de citer une source ou des données.", en: "Use “according to...” when referring to information from a source.", example: "According to our data, sales increased last month.", audience: "professional" },

  { id: "based-on", fr: "« Based on... » signifie « sur la base de ».", en: "“Based on...” means using something as the foundation for a conclusion or decision.", example: "Based on the feedback, we changed the design.", audience: "all" },

  { id: "results-show", fr: "« The results show that... » permet de présenter une conclusion à partir de données.", en: "Use “The results show that...” when explaining what data indicates.", example: "The results show that customer satisfaction has improved.", audience: "professional" },

  { id: "increase-by", fr: "Utilisez « increase by 20% » pour indiquer l'ampleur d'une augmentation.", en: "Use “increase by 20%” to describe the amount of an increase.", example: "Sales increased by 20%.", audience: "business" },

  { id: "increase-to", fr: "Utilisez « increase to » pour indiquer la nouvelle valeur atteinte.", en: "Use “increase to” to state the new value reached.", example: "Monthly sales increased to $10,000.", audience: "business" },

  { id: "decrease", fr: "« Decrease » signifie diminuer ou baisse.", en: "“Decrease” means to become smaller or to reduce.", example: "Operating costs decreased by 10%.", audience: "business" },

  { id: "compared-to", fr: "« Compared to... » permet de comparer deux périodes, produits ou résultats.", en: "Use “compared to...” when comparing two periods, products, or results.", example: "Revenue increased compared to last year.", audience: "business" },

  { id: "goal", fr: "« Goal » désigne un objectif général à atteindre.", en: "A “goal” is a desired result you aim to achieve.", example: "Our goal is to reach 1,000 customers.", audience: "all" },

  { id: "objective", fr: "« Objective » est souvent utilisé pour un objectif plus précis et mesurable.", en: "An “objective” is often a more specific and measurable target.", example: "Our main objective is to improve customer retention.", audience: "professional" },

  { id: "achieve-goal", fr: "On dit « achieve a goal » pour atteindre un objectif.", en: "Say “achieve a goal” when successfully reaching a desired result.", example: "We achieved our sales goal.", audience: "all" },

  { id: "target", fr: "« Target » peut désigner un objectif chiffré.", en: "A “target” can be a specific measurable goal.", example: "We exceeded our monthly sales target.", audience: "business" },

  { id: "kpi", fr: "Un « KPI » est un indicateur clé utilisé pour mesurer la performance.", en: "A “KPI” is a key performance indicator used to measure performance.", example: "Customer retention is one of our main KPIs.", audience: "business" },

  { id: "improve", fr: "« Improve » signifie améliorer ou s'améliorer.", en: "“Improve” means to make or become better.", example: "We need to improve our customer service.", audience: "all" },

  { id: "improvement", fr: "« Improvement » signifie amélioration.", en: "An “improvement” is a change that makes something better.", example: "We've seen a significant improvement in performance.", audience: "all" },

  { id: "challenge", fr: "Dans un contexte professionnel, « challenge » désigne souvent une difficulté à surmonter.", en: "In professional contexts, a “challenge” is a difficulty that requires effort to overcome.", example: "Our biggest challenge is customer acquisition.", audience: "all" },

  { id: "solution", fr: "« Solution » est généralement suivi de « to » : « a solution to the problem ».", en: "“Solution” is generally followed by “to”: “a solution to the problem.”", example: "We need to find a solution to this problem.", audience: "all" },

  { id: "solve-problem", fr: "On dit « solve a problem », et non « resolve a problem » dans la plupart des situations courantes.", en: "“Solve a problem” is the standard expression for finding an answer to a problem.", example: "We're working together to solve the problem.", audience: "all" },

  { id: "figure-out", fr: "« Figure out » signifie trouver ou comprendre une solution, dans un registre courant.", en: "“Figure out” means to understand or find a solution and is common in workplace English.", example: "We need to figure out why the server keeps crashing.", audience: "all" },

  { id: "come-up-with", fr: "« Come up with » signifie trouver ou proposer une idée ou solution.", en: "“Come up with” means to create or think of an idea or solution.", example: "We need to come up with a better solution.", audience: "all" },

  { id: "suggest", fr: "Après « suggest », évitez « suggest to do » ; utilisez par exemple « I suggest doing... ».", en: "After “suggest,” avoid “suggest to do”; use forms such as “I suggest doing...”.", example: "I suggest testing the feature again.", audience: "all" },

  { id: "recommend", fr: "« I recommend... » permet de formuler une recommandation professionnelle.", en: "Use “I recommend...” to give professional advice.", example: "I recommend launching the product in phases.", audience: "all" },

  { id: "what-do-you-think", fr: "« What do you think about...? » permet de demander l'avis de quelqu'un.", en: "Use “What do you think about...?” to ask for someone's opinion.", example: "What do you think about the new design?", audience: "all" },

  { id: "your-thoughts", fr: "« What are your thoughts on...? » est une manière professionnelle de demander un avis.", en: "“What are your thoughts on...?” is a professional way to ask for an opinion.", example: "What are your thoughts on this proposal?", audience: "all" },

  { id: "in-my-opinion", fr: "« In my opinion... » permet d'introduire clairement votre avis.", en: "Use “In my opinion...” to clearly introduce your viewpoint.", example: "In my opinion, we should focus on existing customers first.", audience: "all" },

  { id: "from-my-perspective", fr: "« From my perspective... » est une manière professionnelle de présenter votre point de vue.", en: "“From my perspective...” is a professional way to present your viewpoint.", example: "From my perspective, the second option is more practical.", audience: "professional" },

  { id: "i-see-your-point", fr: "« I see your point » permet de reconnaître l'argument de quelqu'un sans forcément être d'accord.", en: "“I see your point” acknowledges someone's argument without necessarily agreeing.", example: "I see your point, but we also need to consider the cost.", audience: "all" },

  { id: "i-disagree", fr: "« I disagree » permet d'exprimer directement un désaccord.", en: "“I disagree” is a direct way to express disagreement.", example: "I disagree with that approach.", audience: "all" },

  { id: "not-sure-agree", fr: "« I'm not sure I agree » permet d'exprimer un désaccord plus diplomatiquement.", en: "“I'm not sure I agree” is a softer, more diplomatic way to disagree.", example: "I'm not sure I agree with that conclusion.", audience: "professional" },

  { id: "good-point", fr: "« That's a good point » permet de reconnaître la pertinence d'une remarque.", en: "“That's a good point” acknowledges that someone's comment is valuable.", example: "That's a good point. We should consider it.", audience: "all" },

  { id: "makes-sense", fr: "« That makes sense » signifie que quelque chose paraît logique ou compréhensible.", en: "“That makes sense” means something seems logical or understandable.", example: "That makes sense. Let's proceed with that option.", audience: "all" },

  { id: "decision", fr: "« Make a decision » signifie prendre une décision.", en: "“Make a decision” means to choose what should be done.", example: "We need to make a decision today.", audience: "all" },

  { id: "decide-on", fr: "« Decide on » signifie choisir parmi plusieurs options.", en: "“Decide on” means to choose something after considering options.", example: "Have you decided on a launch date?", audience: "all" },

  { id: "move-forward", fr: "« Move forward with... » signifie poursuivre ou commencer une décision/proposition.", en: "“Move forward with...” means to proceed with a plan or decision.", example: "We've decided to move forward with the project.", audience: "business" },

  { id: "proceed", fr: "« Proceed with... » est une façon professionnelle de dire continuer ou passer à l'étape suivante.", en: "“Proceed with...” is a professional way to say continue with a plan or action.", example: "We can proceed with the implementation.", audience: "professional" },

  { id: "approve", fr: "« Approve » signifie donner son accord officiel.", en: "“Approve” means to officially accept or authorize something.", example: "The client approved the final design.", audience: "all" },

  { id: "approval", fr: "« Approval » signifie approbation ou autorisation.", en: "“Approval” means official acceptance or permission.", example: "We're waiting for the manager's approval.", audience: "professional" },

  { id: "sign-off", fr: "« Sign off on something » signifie donner une validation finale.", en: "“Sign off on something” means to give final approval.", example: "The client needs to sign off on the design.", audience: "business" },

  { id: "available-position", fr: "Pour parler d'un poste disponible, utilisez « open position » ou « vacancy ».", en: "Use “open position” or “vacancy” for a job that is available.", example: "I'm interested in the open developer position.", audience: "professional" },

  { id: "apply-for", fr: "On dit « apply for a job » pour postuler à un emploi.", en: "Say “apply for a job” when submitting yourself as a candidate.", example: "I'd like to apply for the web developer position.", audience: "professional" },

  { id: "candidate", fr: "« Candidate » désigne une personne postulant pour un emploi ou une position.", en: "A “candidate” is someone being considered for a job or position.", example: "We're interviewing five candidates today.", audience: "professional" },

  { id: "job-interview", fr: "« Job interview » signifie entretien d'embauche.", en: "A “job interview” is a meeting in which an employer evaluates a candidate.", example: "I have a job interview tomorrow.", audience: "professional" },

  { id: "tell-me-about-yourself", fr: "À « Tell me about yourself », présentez votre profil professionnel plutôt que votre vie personnelle.", en: "For “Tell me about yourself,” focus primarily on your professional background.", example: "I'm a web developer with three years of experience building business applications.", audience: "professional" },

  { id: "strength", fr: "« Strength » désigne un point fort ou une qualité.", en: "A “strength” is a skill or quality you are particularly good at.", example: "One of my strengths is problem-solving.", audience: "professional" },

  { id: "weakness", fr: "« Weakness » désigne un point faible ou un domaine à améliorer.", en: "A “weakness” is an area where you could improve.", example: "One area I'm currently improving is public speaking.", audience: "professional" },

  { id: "skill", fr: "« Skill » signifie compétence acquise.", en: "A “skill” is an ability developed through learning or experience.", example: "Communication is an important professional skill.", audience: "all" },

  { id: "soft-skills", fr: "« Soft skills » désigne les compétences comportementales comme la communication ou le travail d'équipe.", en: "“Soft skills” are interpersonal abilities such as communication and teamwork.", example: "Strong soft skills are important for remote work.", audience: "professional" },

  { id: "technical-skills", fr: "« Technical skills » désigne les compétences spécifiques à un métier ou une technologie.", en: "“Technical skills” are specialized abilities related to a job or technology.", example: "My technical skills include JavaScript, React, and SQL.", audience: "developer" },

  { id: "background", fr: "Dans un entretien, « background » peut désigner votre parcours professionnel et académique.", en: "In professional contexts, “background” can refer to your education and work experience.", example: "I have a background in software development.", audience: "professional" },

  { id: "qualification", fr: "« Qualification » désigne une compétence, formation ou certification pertinente pour un poste.", en: "A “qualification” is a skill, credential, or experience relevant to a role.", example: "What qualifications are required for this position?", audience: "professional" },

  { id: "remote-work", fr: "« Remote work » signifie travail à distance.", en: "“Remote work” means working away from a traditional office.", example: "I have two years of remote work experience.", audience: "all" },

  { id: "work-remotely", fr: "Pour dire « travailler à distance », utilisez « work remotely ».", en: "Use “work remotely” to describe working away from the office.", example: "I work remotely with an international team.", audience: "all" },

  { id: "timezone", fr: "« Time zone » signifie fuseau horaire.", en: "A “time zone” is a geographic region using the same standard time.", example: "What time zone are you in?", audience: "all" },

  { id: "overlap", fr: "En remote, « overlap » désigne les heures pendant lesquelles deux équipes sont disponibles simultanément.", en: "In remote work, “overlap” refers to hours when team members are available at the same time.", example: "We have four hours of overlap each day.", audience: "developer" },

  { id: "internet-connection", fr: "« Internet connection » signifie connexion Internet.", en: "An “internet connection” is your connection to the internet.", example: "Sorry, my internet connection is unstable.", audience: "all" },

  { id: "connection-dropped", fr: "« My connection dropped » signifie que votre connexion s'est interrompue.", en: "“My connection dropped” means your internet connection was interrupted.", example: "Sorry, my connection dropped for a moment.", audience: "all" },

  { id: "youre-on-mute", fr: "« You're on mute » indique à quelqu'un que son microphone est désactivé.", en: "“You're on mute” tells someone their microphone is turned off.", example: "John, you're on mute.", audience: "all" },

  { id: "can-you-hear-me", fr: "« Can you hear me? » permet de vérifier que votre audio fonctionne.", en: "Use “Can you hear me?” to check whether others can hear your audio.", example: "Can you hear me clearly?", audience: "all" },

  { id: "screen-sharing", fr: "« Share my screen » signifie partager son écran.", en: "“Share my screen” means to display your screen to other meeting participants.", example: "Let me share my screen.", audience: "all" },

  { id: "see-my-screen", fr: "Utilisez « Can you see my screen? » pendant une présentation à distance.", en: "Use “Can you see my screen?” during an online presentation.", example: "Can everyone see my screen?", audience: "all" },

  { id: "cutting-out", fr: "« You're cutting out » signifie que le son d'une personne est intermittent.", en: "“You're cutting out” means someone's audio is breaking up intermittently.", example: "Sorry, you're cutting out a little.", audience: "all" },

  { id: "lag", fr: "« Lag » désigne un délai ou ralentissement dans un système ou une communication.", en: "“Lag” refers to a delay in a system or communication.", example: "There seems to be some lag on the call.", audience: "developer" },

  { id: "client-expectations", fr: "« Client expectations » désigne ce que le client attend du service ou projet.", en: "“Client expectations” are what a client expects from a service or project.", example: "We need to manage client expectations.", audience: "business" },

  { id: "manage-expectations", fr: "« Manage expectations » signifie communiquer clairement ce qui est réaliste ou possible.", en: "“Manage expectations” means clearly communicating what is realistic or possible.", example: "It's important to manage expectations from the beginning.", audience: "business" },

  { id: "customer-satisfaction", fr: "« Customer satisfaction » désigne le niveau de satisfaction des clients.", en: "“Customer satisfaction” measures how satisfied customers are with a product or service.", example: "Customer satisfaction is our top priority.", audience: "business" },

  { id: "customer-support", fr: "« Customer support » désigne l'assistance apportée aux clients.", en: "“Customer support” is assistance provided to customers.", example: "Please contact our customer support team.", audience: "business" },

  { id: "complaint", fr: "« Complaint » signifie réclamation ou plainte d'un client.", en: "A “complaint” is an expression of dissatisfaction from a customer.", example: "We received a complaint about the service.", audience: "business" },

  { id: "sorry-inconvenience", fr: "« We apologize for the inconvenience » est une formule professionnelle pour présenter des excuses.", en: "“We apologize for the inconvenience” is a professional way to apologize for a problem.", example: "We apologize for the inconvenience and are working to resolve the issue.", audience: "business" },

  { id: "look-into", fr: "« Look into » signifie examiner ou enquêter sur un problème.", en: "“Look into” means to investigate or examine a problem.", example: "I'll look into the issue and get back to you.", audience: "all" },

  { id: "resolve-issue", fr: "« Resolve an issue » signifie régler un problème, notamment dans un contexte professionnel ou technique.", en: "“Resolve an issue” means to successfully deal with a problem.", example: "Our team is working to resolve the issue.", audience: "all" },

  { id: "thank-you-patience", fr: "« Thank you for your patience » est utile lorsqu'un client attend la résolution d'un problème.", en: "Use “Thank you for your patience” when someone has been waiting for a resolution.", example: "Thank you for your patience while we investigate the issue.", audience: "business" },

  { id: "meet-needs", fr: "« Meet your needs » signifie répondre aux besoins de quelqu'un.", en: "“Meet your needs” means to satisfy someone's requirements.", example: "We can customize the solution to meet your needs.", audience: "business" },

  { id: "tailored", fr: "« Tailored to... » signifie adapté spécifiquement à une personne ou un besoin.", en: "“Tailored to...” means specifically adapted to someone's needs.", example: "Our services are tailored to small businesses.", audience: "business" },

  { id: "customize", fr: "« Customize » signifie adapter ou personnaliser un produit ou service.", en: "“Customize” means to modify something for specific requirements.", example: "We can customize the platform for your company.", audience: "business" },

  { id: "demo", fr: "Une « demo » est une démonstration d'un produit ou service.", en: "A “demo” is a demonstration of how a product or service works.", example: "Would you like to schedule a demo?", audience: "business" },

  { id: "free-trial", fr: "« Free trial » signifie période d'essai gratuite.", en: "A “free trial” is a period during which a product can be used without payment.", example: "You can start with a 14-day free trial.", audience: "business" },

  { id: "subscription", fr: "« Subscription » signifie abonnement.", en: "A “subscription” is an arrangement to pay regularly for continued access to a service.", example: "You can cancel your subscription at any time.", audience: "business" },

  { id: "sign-up", fr: "« Sign up » signifie s'inscrire à un service.", en: "“Sign up” means to register for a service or account.", example: "You can sign up on our website.", audience: "all" },

  { id: "log-in", fr: "« Log in » est le verbe pour se connecter ; « login » est généralement un nom ou adjectif.", en: "“Log in” is the verb for accessing an account; “login” is generally a noun or adjective.", example: "Log in to your account to continue.", audience: "all" },

  { id: "sign-out", fr: "« Sign out » ou « log out » signifie se déconnecter.", en: "“Sign out” or “log out” means to exit an account.", example: "Remember to log out when you're finished.", audience: "all" },

  { id: "account", fr: "« Account » signifie compte utilisateur dans un service numérique.", en: "An “account” is a user's registered profile on a service.", example: "I've created an account for you.", audience: "all" },

  { id: "access", fr: "« Have access to » signifie avoir accès à quelque chose.", en: "Use “have access to” when someone has permission or ability to use something.", example: "Do you have access to the dashboard?", audience: "all" },

  { id: "grant-access", fr: "« Grant access » signifie donner à quelqu'un l'autorisation d'accéder à une ressource.", en: "“Grant access” means to give someone permission to use a resource.", example: "I'll grant you access to the repository.", audience: "developer" },

  { id: "permission", fr: "« Permission » désigne l'autorisation d'effectuer une action.", en: "“Permission” is authorization to perform an action.", example: "You don't have permission to edit this file.", audience: "developer" },

  { id: "networking", fr: "« Networking » désigne le développement de relations professionnelles.", en: "“Networking” means building professional relationships and connections.", example: "Networking can create new business opportunities.", audience: "business" },

  { id: "nice-to-meet-you", fr: "« Nice to meet you » s'utilise lors d'une première rencontre.", en: "Use “Nice to meet you” when meeting someone for the first time.", example: "Nice to meet you. I've heard a lot about your company.", audience: "all" },

  { id: "what-do-you-do", fr: "« What do you do? » demande généralement la profession ou l'activité d'une personne.", en: "“What do you do?” generally asks about someone's profession or business.", example: "What do you do? — I run a software company.", audience: "all" },

  { id: "what-company-does", fr: "« What does your company do? » permet de demander l'activité d'une entreprise.", en: "“What does your company do?” asks about a company's business activities.", example: "What does your company do? — We build digital solutions for schools.", audience: "business" },

  { id: "we-help", fr: "« We help [audience] + verb... » est une structure simple pour présenter votre entreprise.", en: "“We help [audience] + verb...” is a simple structure for explaining what your company does.", example: "We help small businesses build their online presence.", audience: "business" },

  { id: "our-company-provides", fr: "« Our company provides... » permet de présenter clairement vos services.", en: "Use “Our company provides...” to clearly introduce your services.", example: "Our company provides web development and IT services.", audience: "business" },

  { id: "founded", fr: "« The company was founded in... » permet de présenter l'année de création d'une entreprise.", en: "Use “The company was founded in...” to state when a business was established.", example: "The company was founded in 2024.", audience: "business" },

  { id: "mission", fr: "« Our mission is to... » permet de présenter la mission de votre organisation.", en: "Use “Our mission is to...” to explain your organization's purpose.", example: "Our mission is to make professional English more accessible.", audience: "business" },

  { id: "we-focus-on", fr: "« We focus on... » permet de présenter la spécialité ou priorité de votre entreprise.", en: "Use “We focus on...” to describe your company's main area of attention.", example: "We focus on practical professional English.", audience: "business" },

  { id: "looking-for", fr: "« We're looking for... » permet d'exprimer ce que votre entreprise recherche.", en: "Use “We're looking for...” to explain what your company is seeking.", example: "We're looking for distribution partners.", audience: "business" },

  { id: "interested-in", fr: "On dit « interested in », et non « interested by » dans ce contexte.", en: "Say “interested in,” not “interested by,” in this context.", example: "We're interested in exploring a partnership.", audience: "all" },

  { id: "opportunity", fr: "« Opportunity » signifie opportunité ou occasion favorable.", en: "An “opportunity” is a favorable situation that makes something possible.", example: "This could be a great business opportunity.", audience: "all" },

  { id: "explore-opportunity", fr: "« Explore an opportunity » signifie examiner une possibilité de collaboration ou de développement.", en: "“Explore an opportunity” means to investigate a possible collaboration or business option.", example: "We'd like to explore this opportunity further.", audience: "business" },

  { id: "discuss-further", fr: "« Discuss this further » signifie approfondir une discussion.", en: "“Discuss this further” means to continue discussing something in more detail.", example: "I'd be happy to discuss this further.", audience: "business" },

  { id: "stay-in-touch", fr: "« Stay in touch » signifie rester en contact.", en: "“Stay in touch” means to continue communicating after a meeting or conversation.", example: "It was great meeting you. Let's stay in touch.", audience: "all" },

  { id: "connect-linkedin", fr: "« Connect on LinkedIn » permet de proposer de rester en contact professionnellement.", en: "“Connect on LinkedIn” means to establish a professional connection on LinkedIn.", example: "I'd be happy to connect with you on LinkedIn.", audience: "all" },

  { id: "introduce-someone", fr: "« I'd like to introduce you to... » permet de présenter professionnellement deux personnes.", en: "Use “I'd like to introduce you to...” when professionally introducing two people.", example: "I'd like to introduce you to our project manager.", audience: "all" },

  { id: "pleasure-meeting", fr: "« It was a pleasure meeting you » est une formule professionnelle après une rencontre.", en: "“It was a pleasure meeting you” is a professional phrase used after meeting someone.", example: "It was a pleasure meeting you today.", audience: "all" },

  { id: "touch-base", fr: "« Touch base » signifie reprendre brièvement contact pour faire le point.", en: "“Touch base” means to briefly reconnect and exchange updates.", example: "Let's touch base again next week.", audience: "professional" },

  { id: "circle-back", fr: "« Circle back » signifie revenir ultérieurement sur un sujet.", en: "“Circle back” means to return to a topic later.", example: "Let's circle back to this after the client meeting.", audience: "professional" },

  { id: "wrap-up", fr: "« Wrap up » signifie terminer une réunion, discussion ou tâche.", en: "“Wrap up” means to finish a meeting, discussion, or task.", example: "Let's wrap up the meeting with the next steps.", audience: "all" },

  { id: "before-we-finish", fr: "« Before we finish... » permet d'introduire un dernier point avant la fin d'une réunion.", en: "Use “Before we finish...” to introduce a final point before ending a meeting.", example: "Before we finish, I'd like to clarify one thing.", audience: "all" },

  { id: "anything-else", fr: "« Is there anything else you'd like to discuss? » permet de vérifier s'il reste un sujet à traiter.", en: "Use “Is there anything else you'd like to discuss?” before closing a conversation or meeting.", example: "Is there anything else you'd like to discuss?", audience: "all" },

  { id: "summary", fr: "« To summarize... » permet de résumer les points importants.", en: "Use “To summarize...” to briefly restate the main points.", example: "To summarize, we'll launch on Monday and review the results on Friday.", audience: "all" },

  { id: "to-recap", fr: "« To recap... » est une façon naturelle de récapituler une discussion.", en: "“To recap...” is a natural way to summarize a discussion.", example: "To recap, Sarah will contact the client and I'll update the proposal.", audience: "all" },

  { id: "agreed", fr: "« As agreed... » permet de rappeler une décision prise ensemble.", en: "Use “As agreed...” to refer to something both parties decided.", example: "As agreed, I'll send the final version tomorrow.", audience: "all" },

  { id: "thank-you-time", fr: "« Thank you for your time » est une formule professionnelle pour remercier quelqu'un après un échange.", en: "“Thank you for your time” professionally thanks someone for meeting or speaking with you.", example: "Thank you for your time. It was great speaking with you.", audience: "all" }

];
