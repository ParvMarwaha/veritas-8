/**
 * Insights content: 3 series, 23 unique articles.
 * Source: the three Veritas content documents (25-09-26).
 * Everything the Insights hub, the article pages and the homepage teaser render comes from here.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Point = string | { text: string; sub: string[]; ordered?: boolean };

export type Block =
  | { type: 'p'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; title?: string; style: 'bullet' | 'check'; items: string[] }
  | {
      type: 'groups';
      groups: {
        heading: string;
        note?: string;
        intro?: string;
        points: Point[];
        /** When set, points render with large numerals starting at this number. */
        startAt?: number;
      }[];
    }
  | {
      type: 'table';
      columns: { title: string; sub?: string }[];
      rows: { label: string; note?: string; cells: string[][] }[];
      footnote?: string;
    }
  | { type: 'pdf'; label: string; href: string };

export interface Article {
  slug: string;
  /** Short topic line shown above the title (original titles are "Kicker: Title"). */
  kicker: string;
  title: string;
  summary: string;
  /** The series this article primarily belongs to (used for breadcrumbs and prev/next). */
  seriesId: SeriesId;
  blocks: Block[];
}

export type SeriesId = 'lets-get-esops-right' | 'esops-and-beyond' | 'pre-ipo-series';

export interface Series {
  id: SeriesId;
  title: string;
  description: string;
  articleSlugs: string[];
}

/* ------------------------------------------------------------------ */
/* Shared copy                                                         */
/* ------------------------------------------------------------------ */

export const DISCLAIMER =
  'The above content has been furnished solely for information and must not be reproduced or redistributed. It should be noted that we are not soliciting any action based upon it. Also, it does not constitute any recommendation. In particular, the information above is for general purposes only and is not an advice on employee stock option solutions valuations or preference of one scheme over another. The information given above is in summary form and does not purport to be complete. We have reviewed the above and in so far as it includes information or facts, it is believed to be reliable though its accuracy or completeness cannot be guaranteed.';

const PDF = {
  checklist: 'https://www.veritas-india.com/pdf/Checklist_ESOP%20Design.pdf',
  design: 'https://www.veritas-india.com/pdf/designing-successful-esop-program.pdf',
  mistakes: 'https://www.veritas-india.com/pdf/ESOPs-in-Private-Company-Mistakes-to-avoid.pdf',
  budgeting: 'https://www.veritas-india.com/pdf/esop-startegy.pdf',
  vesting: 'https://www.veritas-india.com/pdf/lets-get-the-vesting-criteria-right.pdf',
};

/* Used by both "Launch Your Scheme The Right Way" and "Let's Get The Designing Right!" */
const designConsiderationsBlocks: Block[] = [
  {
    type: 'p',
    text: 'ESOPs have emerged as a popular tool and are being employed by more and more companies to retain and motivate their key employees. But despite the increasing popularity of ESOPs, many organisations do not truly understand the basics involved in owning and operating an Employee Stock Ownership Plan.',
  },
  {
    type: 'p',
    text: 'Launching of successful stock ownership plans involve various considerations, which must be well-thought-out during the design and implementation stage. Access our editorial on 5 key design considerations that any organization launching an ESOP scheme will find relevant.',
  },
  { type: 'pdf', label: 'Designing a Successful ESOP Program', href: PDF.design },
  {
    type: 'p',
    text: 'This presentation is a 5-minute read highlighting the importance of launching your ESOP scheme the right way. The key considerations have been summarized below for your ready reference.',
  },
  {
    type: 'groups',
    groups: [
      { heading: 'ESOP Pool Philosophy', points: ['Manage Dilution vs. Value Creation'] },
      { heading: 'Defining Grant Framework', points: ['Who to give?', 'How much to give?', 'When to give?'] },
      { heading: 'Setting Terms of Grant', points: ['Choosing terms that best aligns interests'] },
      { heading: 'Optimising Cost vs. Wealth Creation', points: ['Maximise wealth whilst minimizing cost'] },
      {
        heading: 'Critical Non-Financial Aspects',
        points: ['Keeping the scheme flexible and avoiding issues in future'],
      },
    ],
  },
  {
    type: 'callout',
    text: 'Launching an ESOP scheme involves balancing varied stakeholders’ interests, often an iterative process, and something we at Veritas specialize in doing.',
  },
];

/* Used by both series that carry "Is This The Right Time For Your Organization?" */
const rightTimeBlocks: Block[] = [
  {
    type: 'p',
    text: 'Founders of many start-ups as well as established unlisted companies often ask us ‘if this is the right time for us to launch ESOPs?’ Or that ‘we are not listed - do ESOPs even make sense for us?’ Or that ‘we have just started out and most of the growth is in the future - should we do ESOPs now or later?’',
  },
  {
    type: 'list',
    title: 'In our interactions, we find some common apprehensions',
    style: 'bullet',
    items: [
      'We are too small',
      'We are too young, we just started out',
      'We are private and closely held',
      'We are not listed and not looking to get listed',
      'Not sure if we should be diluting at this stage',
    ],
  },
  {
    type: 'p',
    text: 'All of these are valid concerns and there is no single right answer for all. Whether ESOPs are the right fit for your organization at the current stage in turn depends on the response to the following questions:',
  },
  {
    type: 'list',
    style: 'check',
    items: [
      'Are you expecting to grow significantly over the next few years (typically, 3 to 7 years)?',
      'Are you looking to align the interests and make employees work for themselves whilst working for you?',
      'Do you envisage any type of corporate transactions which could potentially create an exit route for ESOPs?',
    ],
  },
  { type: 'callout', text: 'If the answer to these questions is yes, then yes ESOPs do make sense for your organisation!' },
  {
    type: 'p',
    text: 'Please note that we do understand that the key apprehension often comes from the fact that the organisation is not listed and hence what can be the exit route for employees? It is important to note here that many corporate transactions such as strategic sale, funding or series of funding etc. act as potential exit route for ESOP holders. Not just that, if your organization over time becomes profitable and cash rich, cash-settlement or buy-back of ESOPs can also be undertaken.',
  },
  {
    type: 'p',
    text: 'Finally, whilst ESOPs are certainly doable for private companies, it’s even more important for them to get the ESOP quantum and terms right, so that the interests of shareholders and founders are protected whilst the employees get to participate in the up-side.',
  },
];

/* ------------------------------------------------------------------ */
/* Articles                                                            */
/* ------------------------------------------------------------------ */

export const articles: Article[] = [
  /* ---------------- Series 01 · Let's Get ESOPs Right ---------------- */
  {
    slug: 'lets-get-the-mathematics-right',
    kicker: 'ESOPs',
    title: 'Let’s Get The Mathematics Right!',
    summary:
      'Before the paperwork comes the design. Why the mathematics has to work for shareholders, the company and employees alike.',
    seriesId: 'lets-get-esops-right',
    blocks: [
      {
        type: 'p',
        text: 'At the core of launching a successful ESOP scheme is getting the mathematics right for all stakeholders - shareholders, company as well as the employees. Yet, we see most companies focus more on administrative and secretarial aspects. Whilst these aspects are important, to us at Veritas, they constitute the Stage 2 of the implementation process.',
      },
      {
        type: 'p',
        text: 'Stage 1 is essentially designing the scheme before it’s enshrined in the documents and involves, amongst other things, balancing interests of various stakeholders as summarised below:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Shareholders',
            points: [
              'Ensuring optimum dilution - not diluting too fast, too soon',
              'Aligning milestones for shareholders and employees',
            ],
          },
          {
            heading: 'Company',
            points: [
              'Ensuring charge to Income statement is within expected levels',
              'Ensuring enough flexibility for Board to cater to emerging needs',
            ],
          },
          {
            heading: 'Employees',
            points: [
              'Ensuring meaningful wealth creation for employees',
              'Benchmarking expected wealth creation to CTC, industry etc.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Balancing varied stakeholders’ interests is often an iterative process and is something we at Veritas specialize in doing.',
      },
    ],
  },
  {
    slug: 'lets-get-the-risk-management-right',
    kicker: 'ESOPs',
    title: 'Let’s Get The Risk Management Right!',
    summary:
      'An ESOP is a five-to-seven-year plan, and business tends to throw surprises. The risks to plan for and the flexibility to build in.',
    seriesId: 'lets-get-esops-right',
    blocks: [
      {
        type: 'p',
        text: 'An ESOP program is essentially a medium to long-term wealth creation plan, which has relevance even after more than five to seven years from the date of launch. And over such a long period, business, like life, has the tendency to throw surprises - sometimes good and sometimes not so pleasant. Hence, whilst launching an ESOP program, it is important to get the risk management right!',
      },
      {
        type: 'p',
        text: 'Proper risk management in an ESOP program includes understanding various risks and ensuring enough flexibilities for the Board and embedding the right clauses in the ESOP Scheme to tackle different situations. The below gives a flavour of some of the risks / scenarios one should consider when implementing any ESOP Program.',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Business / Strategic Risk',
            points: [
              'Growing faster than expected, resulting in Liquidity Event taking place during vesting period',
              'Not growing fast enough resulting in ESOPs becoming ‘out of money’ or ‘underwater’.',
              'Too much grant upfront resulting in inadequate budgets for future grants to existing employees or new hires',
            ],
          },
          {
            heading: 'Employee Risk',
            points: [
              'Employee joining competition whilst holding shares or vested ESOPs of your Company',
              'Employee not performing well enough and yet benefiting from vesting of options',
            ],
          },
          {
            heading: 'Legal / Documentation Risk',
            points: [
              'Stringent ESOP scheme rules making it difficult to cater to emerging business needs and scenarios. For example, stringent rules for corporate transactions / liquidity events.',
              'Non-compliance with various applicable rules e.g. SEBI rules, FEMA rules, provisions of Companies Act, etc.',
            ],
          },
        ],
      },
      { type: 'callout', text: 'Note that the above is just an illustrative list and by no means exhaustive.' },
    ],
  },
  {
    slug: 'lets-get-the-exercise-price-right',
    kicker: 'ESOPs',
    title: 'Let’s Get The Exercise Price Right!',
    summary:
      'Lowest is not always best. How purpose of grant, compensation philosophy, dilution and P&L should shape the price you offer.',
    seriesId: 'lets-get-esops-right',
    blocks: [
      {
        type: 'p',
        text: 'A key decision in launching an ESOP scheme is the price at which you should offer your shares i.e., the Exercise Price. It is the price the employee will eventually pay to receive the shares and monetize the gain on their ESOPs.',
      },
      {
        type: 'p',
        text: 'A simple google search of what should be your exercise price philosophy will give you a plethora of material on keeping it as low as possible vis-à-vis the share price. Many market participants swear by keeping the exercise price equal to face value (minimum possible by law) and making the scheme as employee friendly as possible.',
      },
      { type: 'callout', text: 'We only wish it was that simple!' },
      {
        type: 'p',
        text: 'In our view, Exercise Price needs to be set such that it results in alignment of interests i.e., puts the employee in the same / similar position as the shareholder of the Company. In addition, the Company also needs to consider the alignment of other factors such as compensation philosophy, purpose of grant and consistency with other terms of grant in determining the exercise price.',
      },
      { type: 'p', text: 'We therefore recommend Companies to set their exercise price considering the following aspects:' },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Purpose of Grant',
            points: [
              'If rewarding past performance, such as founding team members, the Company may offer ESOPs at deep discount as reward for their role in building the Company.',
              'If incentivising future growth, the discount may be limited to create an incentive for employees to work towards increasing the share price, else their ESOPs would be out-of-money.',
              'For regular retention or annual appraisal linked grants, the approach needs to be aligned with grant frequency, grant size, company and industry specific factors.',
            ],
          },
          {
            heading: 'Alignment with Compensation Philosophy',
            points: [
              'If using ESOPs to compensate for CTC reduction, offer ESOPs at face value to minimize the dilution whilst maximising employee’s wealth creation.',
              'If using ESOPs as additional reward over and above CTC, follow the ‘incentivising future growth’ principle highlighted above.',
            ],
          },
          {
            heading: 'Is dilution a concern?',
            points: [
              'For granting a given value of ESOPs, lower the exercise price, less the number of ESOPs that would be required to be granted.',
              'Thus, exercise price can be a lever when dilution is a concern.',
            ],
          },
          {
            heading: 'Is the P&L hit acceptable?',
            points: [
              'Higher the discount, higher is the P&L charge for the Company. Don’t go by benchmarks, get the mathematics right for your Company!',
              'Many start-ups begin with their ESOP journey by offering ESOPs at face value and continue the same approach even when they scale up. By the time their ESOP charge starts biting them (easily running into 100s of crores for large companies), they find it hard to pass the message of increase in exercise price to the employees.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Lastly, it is important to have an overall balance between discount (or lack of it) on exercise price vis-à-vis the vesting conditions set. Avoid making the double mistake of keeping exercise price low and offering service based monthly / quarterly vesting without any performance linkages.',
      },
    ],
  },
  {
    slug: 'lets-get-the-vesting-criteria-right',
    kicker: 'ESOPs',
    title: 'Let’s Get The Vesting Criteria Right!',
    summary:
      'Is your vesting criteria encouraging ‘rest and vest’ behavior? One of the biggest levers in a scheme, and one most companies leave on default.',
    seriesId: 'lets-get-esops-right',
    blocks: [
      {
        type: 'p',
        text: 'Vesting Criteria is one of the biggest levers available in an ESOP scheme to drive the right employee behavior. It is also something that significantly impacts the level as well as pattern of charge to the income statement.',
      },
      {
        type: 'p',
        text: 'Despite this, we notice the majority of the Companies adopt the standard 4-year time-based vesting schedule for all their grants, across grades as well across various points of their growth journey.',
      },
      {
        type: 'p',
        text: 'Access our latest short presentation on “How you can get the Vesting Criteria right?”',
      },
      { type: 'pdf', label: 'Let’s Get The Vesting Criteria Right', href: PDF.vesting },
      {
        type: 'p',
        text: 'The presentation is a 5-minute read and highlights various options available for vesting criteria, the advantages and challenges of the options and our recommendations on suitability of vesting criteria for various job levels. Some of the themes you shall notice in the article are as follows:',
      },
      {
        type: 'list',
        style: 'check',
        items: [
          'Choose performance criteria to avoid ‘Rest and Vest’ behavior',
          'Link vesting to anticipated transactions to ensure perfect alignment',
          'Get your mathematics right by simulating charge to income statement under different options of vesting criteria',
        ],
      },
    ],
  },
  {
    slug: 'lets-get-the-designing-right',
    kicker: 'ESOPs',
    title: 'Let’s Get The Designing Right!',
    summary:
      'Five design considerations every organisation launching an ESOP scheme should think through, from pool philosophy to flexibility.',
    seriesId: 'lets-get-esops-right',
    blocks: designConsiderationsBlocks,
  },
  {
    slug: 'lets-get-the-documentation-right',
    kicker: 'ESOPs',
    title: 'Let’s Get The Documentation Right!',
    summary:
      'Clear enough for employees, flexible enough for the Board. Three areas of the scheme that need to be drafted carefully.',
    seriesId: 'lets-get-esops-right',
    blocks: [
      {
        type: 'p',
        text: 'If you have been following our updates, you would know that we strongly believe in getting mathematics and risk management right when launching your ESOP Program. Having done the same, the next critical contour in the launch journey of ESOPs is getting your documentation right!',
      },
      {
        type: 'p',
        text: 'In our view, whilst detailed rules on the working of ESOP Program under different scenarios need to be well thought through and agreed as part of the ‘mathematics’ and ‘risk management’ phase, bringing these together in the form of right documentation needs to be done in a balanced manner. The scheme needs to be clear and detailed enough for the employees whilst giving enough flexibility and protection to the board for the future uncertain scenarios.',
      },
      { type: 'p', text: 'Below is a quick snapshot of three (amongst many) critical areas in an ESOP scheme that need to be drafted carefully:' },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Liquidity Event Rules',
            note: 'For Private Companies',
            points: [
              'Flexibility to Board to decide exact treatment of ESOPs for in-service and ex-employees on happening of Liquidity events whilst protecting employee interests.',
              'Flexibility to enable acceleration of vesting in future.',
              'Avoiding prescriptive rules, as the exact nature of future transactions can never be predicted in advance.',
            ],
          },
          {
            heading: 'Treatment of Vested Options',
            intro:
              'Clearly defining treatment of vested option if no Liquidity event takes place separately for:',
            points: [
              'In-service employees;',
              'Employees leaving within 1 to 2 years versus employees leaving after completing full vesting period;',
              'Retirees / treatment in case of any unfortunate event with employees.',
            ],
          },
          {
            heading: 'Compliance Aspects',
            points: [
              'Ensuring scheme rules such as minimum vesting period, treatment of ESOPs in case of death or disability of employees, category of employees eligible etc. are in line with the Companies Act and where applicable SEBI rules and FEMA requirements are ensured.',
              'Ensuring the scheme adoption process follows due course.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'esops-or-sars-choosing-the-right-instrument',
    kicker: 'ESOPs or SARs',
    title: 'Choosing The Right Instrument',
    summary:
      'Equity-settled or cash-settled? A side-by-side look at how ESOPs / RSUs and SARs / Phantom Stocks differ for shareholders, employees and the income statement.',
    seriesId: 'lets-get-esops-right',
    blocks: [
      {
        type: 'p',
        text: 'When it comes to implementing stock-based compensation, the choice is really between choosing Equity-Settled Instruments (such as ESOPs or RSUs) or Cash-Settled Instruments (such as SARs or Phantom Stocks). Both equity and cash settled instruments can be structured to result in similar monetary outcomes for the employees but their impact from a shareholder and Company’s income statement perspective may materially differ.',
      },
      {
        type: 'p',
        text: 'Choosing the right scheme is key to ensuring you optimize outcomes for all three stakeholders i.e. shareholders, employees and Company. Below is a quick snapshot of how the two categories of instruments differ:',
      },
      {
        type: 'table',
        columns: [
          { title: 'Equity Settled Instruments', sub: 'ESOPs / RSUs / ESPPs' },
          { title: 'Cash Settled Instruments', sub: 'SARs / Phantom Stocks' },
        ],
        rows: [
          {
            label: 'Dilution',
            cells: [
              ['Part of the capital table and hence dilutive in nature.'],
              ['Does not form part of the capital table and hence non-dilutive in nature.'],
            ],
          },
          {
            label: 'Flexibility',
            cells: [
              ['Requires compliance under Companies Act, FEMA and SEBI Regulations.'],
              [
                'Outside purview of Companies Act offering greater flexibility in structuring the instrument.',
                'Private companies often use these instruments to incentivize advisors or consultants.',
              ],
            ],
          },
          {
            label: 'Settlement',
            cells: [
              [
                'Typically settled as part of external corporate transactions or Liquidity events (such as IPO, Strategic sale etc.) in private companies.',
                'Listed entity employees can convert ESOPs to shares and trade in the open market.',
              ],
              [
                'Can be settled in the same manner as ESOPs i.e., as part of corporate transactions or Liquidity Events; or',
                'Settled internally at end of fixed period basis pre-agreed valuation formula.',
              ],
            ],
          },
          {
            label: 'Financial Implications for Company',
            cells: [
              ['Treated as Equity in books of accounts, leading to a notional charge recognized over vesting period.'],
              [
                'Treated as a Liability in books of accounts, leading to creation of provision which is remeasured at marked to market basis until settled.',
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'is-this-the-right-time-for-your-organization',
    kicker: 'ESOPs',
    title: 'Is This The Right Time For Your Organization?',
    summary:
      'Too small? Too young? Not listed? Three questions that tell you whether ESOPs make sense for your company right now.',
    seriesId: 'lets-get-esops-right',
    blocks: rightTimeBlocks,
  },

  /* ---------------- Series 02 · ESOPs & Beyond ---------------- */
  {
    slug: 'esop-design-checklist',
    kicker: 'ESOPs',
    title: 'ESOP Design Checklist',
    summary: 'A ready-reference checklist to work through while designing your ESOP scheme.',
    seriesId: 'esops-and-beyond',
    blocks: [
      { type: 'p', text: 'Access the ESOP Design Checklist below for your reference.' },
      { type: 'pdf', label: 'ESOP Design Checklist', href: PDF.checklist },
    ],
  },
  {
    slug: 'launch-your-scheme-the-right-way',
    kicker: 'ESOPs',
    title: 'Launch Your Scheme The Right Way',
    summary:
      'A five-minute read on the five key considerations behind a well-launched ESOP scheme, summarised for ready reference.',
    seriesId: 'esops-and-beyond',
    blocks: designConsiderationsBlocks,
  },
  {
    slug: 'launching-esops-9-common-mistakes-to-avoid',
    kicker: 'Launching ESOPs',
    title: '9 Common Mistakes To Avoid',
    summary:
      'The nine mistakes that stop ESOPs from being successful, across the design phase, implementation and post roll-out.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'ESOPs have emerged as a popular tool and are being employed by more and more companies to retain and motivate their key employees. But despite the increasing popularity of ESOPs, many organisations do not truly understand the basics involved in owning and operating an Employee Stock Ownership Plan.',
      },
      {
        type: 'p',
        text: 'Launching of successful stock ownership plans involve various considerations, which must be well-thought-out during the design and implementation stage. If your organisation is looking to launch an ESOP scheme, make sure that you avoid the top nine mistakes that prevent ESOPs from being successful. They are summarised below:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Design Phase',
            startAt: 1,
            points: [
              'Diluting Too Much, Too Soon',
              'Granting only service linked ESOPs to senior resources',
              'Undermining Importance of P&L charge of ESOPs',
            ],
          },
          {
            heading: 'Implementation Phase',
            startAt: 4,
            points: [
              'Creating cash-flow strain for Employees',
              'Lack of flexibility to Board in case of corporate transactions',
              'Not enabling Ex-employees to share in value created',
            ],
          },
          {
            heading: 'Post Implementation',
            startAt: 7,
            points: [
              'Not enough employee Communication',
              'Faltering on accounting and Board Disclosures',
              'Lack of ESOP framework beyond first grant',
            ],
          },
        ],
      },
      {
        type: 'p',
        text: 'Read our latest editorial on key mistakes that any Private Company implementing ESOPs should be wary of at the Design Stage, Implementation Stage and Post Roll-out stage:',
      },
      { type: 'pdf', label: 'ESOPs in a Private Company: Mistakes to Avoid', href: PDF.mistakes },
    ],
  },
  {
    slug: 'esop-charge-non-cash-but-not-notional',
    kicker: 'ESOP Charge',
    title: 'Non-cash but not Notional!',
    summary:
      'ESOPs create a non-cash charge to the income statement, but it has very real implications for earnings, EPS and valuation.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'We at times come across clients (including CEOs, CFOs as well as investors) who believe ESOPs only create a non-cash notional charge to income statement and hence financial charge analysis may not be necessary when granting ESOPs. Well yes, ESOPs do result in a non-cash charge to income statement but it is by no means notional.',
      },
      {
        type: 'p',
        text: 'ESOP charge does have tangible economic implications for the Company’s financials and valuations, some of which are summarized below:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Income Statement',
            intro: 'The charge arising on account of ESOP results in:',
            points: [
              'Increase in Employee compensation expenses, thereby reducing reported EBITDA and PAT.',
              'Decrease in both Basic and Diluted EPS, reducing shareholder’s earnings. Effectively ESOP charge cannot be added back for distributing dividends and to that extent, is a real hit on the shareholder’s profits.',
            ],
          },
          {
            heading: 'Company Valuation',
            intro:
              'Impact of ESOP charge on Company valuation is more complicated to assess and depends on various factors. In particular:',
            points: [
              'For listed companies, the impact on EPS is real and retail investors factor this in valuing the Company. Thus, ESOP charge impact is more pronounced for listed companies, all else being the same.',
              {
                text: 'For private companies,',
                sub: [
                  'Investors recognize that initially a higher ESOP charge is required to attract and build the right leadership team. Thus, a large ESOP charge in initial years is generally viewed as an investment into the business and may not impact valuation adversely.',
                  'However, continued large levels of ESOPs charge over time may indicate low retention (and hence the need to continually give large quantum of ESOPs) or a lack of a clear ESOP Program, in addition to the constant hit on P&L. This is very well likely to result in lower valuation over time.',
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'In a nutshell, the impact of ESOP charge is not notional. It’s a real hit to shareholder’s distributable income and, if the charge is not planned well, it will adversely impact the valuation as well.',
      },
    ],
  },
  {
    slug: 'esop-budgeting-optimize-your-pl-charge',
    kicker: 'ESOP Budgeting',
    title: 'Optimize Your P&L Charge',
    summary:
      'Setting the ESOP budget alongside the business plan: the three levers that directly drive the income statement charge.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'As Companies prepare their business plan and budgets for the ensuing financial year, it’s important to set your ESOP budgets as well. This requires setting budgets for shareholder dilution, employee coverage and overall income statement charge on account of ESOPs.',
      },
      {
        type: 'p',
        text: 'An important aspect of the ESOP Budgeting exercise is to consider ways and means to optimize the overall P&L charge on account of ESOPs. This requires marrying of the business planning and appraisal cycle process to ensure company, employee and shareholder outcomes can be best optimized.',
      },
      {
        type: 'p',
        text: 'Below is a quick snapshot of the 3 key areas which directly impact ESOP charge and the strategies available to companies to optimize the same.',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Grant Size Strategy',
            intro: 'Grant size strategy directly impacts the quantum of grant and hence the P&L charge.',
            points: [
              'Most companies adopt simple CTC multiple approach wherein the number of ESOPs is estimated basis the current CTC and latest share price of Company. Your business plans or exercise price has no impact on the estimated grant.',
              {
                text: 'We recommend adopting a targeted wealth creation approach which goal seeks the grant size by:',
                sub: [
                  'Assessing target share price of company in next 3 to 4 years basis business plan inputs;',
                  'Factoring the offered exercise price to estimate potential wealth per ESOP; and',
                  'Back-solving the number of ESOPs required to create the targeted wealth (say 4x current CTC at the end of 4 years) for employees.',
                ],
              },
              'This approach directly adjusts the number of ESOPs basis how you see your business growing.',
              'Companies can further optimize grant strategy by assessing one-big grant approach vis-à-vis annual recurring grant approach, both of which can work well depending upon the growth stage.',
            ],
          },
          {
            heading: 'Exercise Price Philosophy',
            points: [
              'Higher the discount, higher is the P&L charge, all else being the same. However, exercise price used in conjunction with grant size approach can be an important lever in managing the overall cost.',
              'The targeted wealth creation approach highlighted above is the only approach which factors exercise price as an input in determining the grant size. Under this approach, a higher discount automatically results in lower grant size thereby balancing the P&L charge.',
              'Whilst the overall impact may depend on various company specific factors, in our view this approach gives greater flexibility to management to decide exercise price philosophy whilst still managing their P&L charge.',
            ],
          },
          {
            heading: 'Vesting Criteria and Period',
            points: [
              {
                text: 'Use vesting criteria as a lever to optimize the charge recognition pattern:',
                sub: [
                  'Longer or progressive vesting schedule (such as Y1-10%, Y2-20% and so on) reduces the charge in initial years whilst also promoting better retention.',
                  'Performance linked vesting such as linkage to individual rating or company level targets helps ensure ESOPs vest in line with the individual / company performance and the same is factored in P&L charge estimation as well.',
                ],
              },
              'Use vesting as a lever to optimize charge quantum by having market linked vesting i.e. vesting linked to achievement of share price targets, market cap targets etc. which directly impact the fair value of ESOPs. These targets are common for C-Suite of large companies.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'In our view, ESOP budgeting is an essential yearly exercise and the same needs to be embedded in the business planning and appraisal cycle to achieve the best results.',
      },
      { type: 'p', text: 'If you would like to read more on ESOP budgeting, access our detailed article on this topic:' },
      { type: 'pdf', label: 'ESOP Budgeting & Strategy', href: PDF.budgeting },
    ],
  },
  {
    slug: 'esop-budgeting-choose-the-right-grant-strategy',
    kicker: 'ESOP Budgeting',
    title: 'Choose The Right Grant Strategy',
    summary:
      'Who should get how much? Three commonly used grant size approaches, and how each affects dilution and the P&L.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'With the new financial year around the corner, the Companies are busy finalizing their Annual Operating Plans (AOP) or budgets for the next fiscal year. As companies set their limits for various line items in their budget, below is a quick look at the different ESOP grant strategies one may consider in deciding ‘who should get how much?’. This in turn helps in determining the charge to P&L arising out of ESOPs plan of the Company.',
      },
      {
        type: 'p',
        text: 'In our earlier communications, we have highlighted that the companies should choose an approach which optimizes their shareholder dilution and charge to income statement whilst maximizing employee wealth and aligning with business plan goals. Below is a snapshot of the 3 commonly used grant size approaches:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'CTC Replacement Approach',
            points: [
              'This approach is used where a part of the fixed pay is being replaced with ESOPs. This is common in early-stage start-ups where senior employees / KMPs often join at reduced CTC in lieu of ESOPs.',
              {
                text: 'Following are the considerations in setting grant size using this approach:',
                sub: [
                  'Adjusting quantum of CTC reduction for liquidity considerations to allow for the fact that a liquid asset (i.e. cash) is being replaced with an illiquid one (in case of unlisted companies). For instance, INR 10 Lac CTC reduction may be considered as INR 15 Lac CTC reduction in determining ESOP grant size.',
                  'Assessing expected CTC reduction year-on-year for next 3 to 4 years till the fixed pay is restored to market levels or the gains from ESOP materially surpass the reduction in fixed pay across the years. Companies may need to make incremental grants each year to make good such future reductions and ensure the same is factored in their grant strategy.',
                  'Offering ESOPs at deep discount and simple vesting conditions to compensate for any real cut in disposable income of employees.',
                ],
              },
              'Note that the level of adjustments required above will depend upon Company specific factors such as expected growth trajectory, time to liquidity events etc. and will accordingly influence Company’s grant strategy.',
            ],
          },
          {
            heading: 'Immediate Value Approach',
            points: [
              {
                text: 'Under this approach, ESOP grants are made with an intent of offering immediate value in the hands of employees. Different companies adopt different interpretation of ‘value’ and accordingly determine ESOP grant in one of the following ways:',
                ordered: true,
                sub: [
                  'Using latest available share price, with no adjustment for exercise price, thereby offering ESOPs whose current market value is equal to target amount;',
                  'Using intrinsic value (i.e. current share price less exercise price) thereby offering ESOPs with immediate wealth creation in hands of employees equal to target amount; or',
                  'Using fair value (determined using option pricing methods) thereby offering ESOPs which are expected to create a target amount for the employee over exercise period.',
                ],
              },
              'Target amount is typically defined as X times current CTC of employees (such as 0.5x to 1x current CTC for different categories of employees).',
              'Whilst this is the most commonly used approach, it may often result in higher dilution (especially where techniques 1 and 2 are used) as it does not factor expected growth trajectory of the Company.',
            ],
          },
          {
            heading: 'Targeted Wealth Creation Approach',
            points: [
              {
                text: 'This is probably the most scientific of all the approaches as it looks to marry the business plan with the potential wealth creation for the employees. Under this approach, the grant size is determined by:',
                sub: [
                  'Assessing target share price of company in next 3 to 4 years basis business plan inputs;',
                  'Factoring the offered exercise price to estimate potential wealth per ESOP; and',
                  'Back-solving the number of ESOPs required to create the targeted wealth (say 4x current CTC at the end of 4 years) for employees.',
                ],
              },
              'This approach directly adjusts the number of ESOPs based on how the management sees the business growing and therefore anchors the employees more towards the future potential than immediate value of ESOPs in their hands. In our experience, this approach can help limit dilution in case of fast-growing companies where even small amounts of equity may be very valuable by the end of the vesting period if the Company is able to deliver on its business plan.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'In our view, choosing the right grant size strategy is an essential part of ESOP budgeting exercise and needs to be aligned with overall compensation approach and business plan budgets.',
      },
    ],
  },
  {
    slug: 'the-esop-decision-broad-based-or-selective-grant',
    kicker: 'The ESOP Decision',
    title: 'Broad-Based Grant or Selective Grant?',
    summary:
      'Democratise ownership or reward the few? The pros and cons of each from the perspective of shareholders, employees and the income statement.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'As founders, sharing equity with employees is both an emotional and strategic business decision. One of the most critical choices in this journey is whether to implement a broad-based ESOP program or a selective ESOP program.',
      },
      {
        type: 'p',
        text: 'A broad-based ESOP program democratizes ownership by covering all employees, fostering a sense of inclusion and shared success. In contrast, a selective ESOP program focuses on rewarding key and high-performing employees, enhancing motivation and retention through targeted incentives. Both approaches offer distinct advantages and challenges.',
      },
      {
        type: 'p',
        text: 'Ultimately, the decision rests with the founders and shareholders, guided by the company’s vision and objectives. Below, we outline the pros and cons of each approach from the perspectives of key stakeholders: shareholders, employees, and the company’s financial impact.',
      },
      {
        type: 'table',
        columns: [{ title: 'Broad-based ESOP Program' }, { title: 'Selective ESOP Program' }],
        rows: [
          {
            label: 'Shareholder Impact',
            cells: [
              [
                'Higher dilution, which may be concerning for companies anticipating significant dilution from future fundraising.',
                'Challenging for start-ups, but the right strategy and calculations may help limit dilution for companies with high growth expectations.',
                'Large listed companies may use trusts and offer deep discounts to minimize dilution.',
              ],
              [
                'Lower dilution due to limited coverage.',
                'Right strategy and calculations can help optimize dilution and align same with business plan.',
              ],
            ],
          },
          {
            label: 'Employee Impact',
            cells: [
              [
                'Including employees at all levels sends a positive message, particularly for listed companies where liquidity is more readily available.',
                'Wealth creation potential may be limited for junior employees due to smaller grant sizes, particularly in private companies where junior employees may prefer cash over illiquid ESOPs.',
              ],
              [
                'Creates a sense of reward and recognition by limiting incentives to a select group.',
                'Enables more meaningful wealth creation for recipients.',
                'Serves as a future leader program, motivating junior employees to achieve goals that could earn them ESOPs over time.',
                'Effective communication is essential to prevent non-participating employees from feeling excluded.',
              ],
            ],
          },
          {
            label: 'Income Statement Impact',
            cells: [
              [
                'Higher impact as a larger number of employees are covered, especially concerning for listed companies.',
                'Requires phased approach and regular monitoring to manage costs.',
                'May increase administrative costs due to complexity of managing a larger ESOP pool.',
              ],
              [
                'Lower impact on the income statement, all else being the same.',
                'Allows for more precise budgeting and forecasting.',
                'Reduced administrative costs compared to broad-based programs.',
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'the-esop-decision-big-grants-or-annual-boosts',
    kicker: 'The ESOP Decision',
    title: 'Big Grants or Annual Boosts?',
    summary:
      'One big grant or annual recurring grants? How grant frequency shapes the pool, the vesting, the cost and the dilution.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'Founders of startups and established unlisted companies often ask us about the best ESOP grant strategy post the initial grant. ‘Should they make annual ESOP grants or opt for sizeable one-time grants with occasional top-ups?’',
      },
      {
        type: 'p',
        text: 'Grant frequency is a crucial yet often overlooked aspect of ESOP strategy. It significantly impacts the overall plan, including the size of the ESOP pool, grant quantum, vesting periods, and targeted wealth. Companies can choose between two grant strategies: one big grant or annual recurring grants.',
      },
      {
        type: 'p',
        text: 'One big grant provides a substantial upfront incentive aligned with long-term business targets over the next 4 to 5 years. In contrast, annual recurring grants offer smaller, regular incentives as part of the appraisal cycle. Below is a snapshot of these two approaches, highlighting their suitability, benefits, and impact on three ESOP stakeholders - employees, shareholders, and company.',
      },
      {
        type: 'table',
        columns: [{ title: 'One-big grant' }, { title: 'Annual recurring grant' }],
        rows: [
          {
            label: 'Grant Structure',
            cells: [
              ['Substantial ESOP grant given at once, designed to last 4-5 years.'],
              ['Smaller, bite-sized ESOP grants given annually.'],
            ],
          },
          {
            label: 'Suitability',
            cells: [
              [
                'Startups and high-growth companies anticipating exponential growth, scale-up, or an IPO within the next 4-5 years unless significant core team hiring is planned in this period.',
              ],
              ['Mature companies expecting stable / steady growth year on year or fast growing start-ups with significant hiring plans.'],
            ],
          },
          {
            label: 'Grant Size',
            cells: [
              ['Significant grant size to create targeted wealth over the chosen vesting period.'],
              ['Ongoing wealth accumulation through regular, smaller grants.'],
            ],
          },
          {
            label: 'Vesting Period',
            cells: [
              ['Typically aligns with key milestone timelines, generally not exceeding 5 years in Indian context.'],
              ['Vesting period aligns with market norms, generally 3-4 years for each grant.'],
            ],
          },
          {
            label: 'Top-up Grants',
            cells: [
              [
                'Small top-ups made during vesting period to allow grade changes or exceptional performance.',
                'Next sizeable grant planned only close to the expiry of vesting period of the first grant.',
              ],
              [
                'Regular grants made each year, as part of the appraisal cycle.',
                'CTC / grade or performance adjustments included in yearly grants.',
              ],
            ],
          },
          {
            label: 'Employee Engagement',
            cells: [
              [
                'Creates strong initial alignment with long-term goals.',
                'Regular employee communication required to reduce risk of loss of motivation post initial grant.',
              ],
              [
                'Ensures continuous engagement through annual appraisal linked grants though employee’s ESOP holding builds up over time.',
              ],
            ],
          },
          {
            label: 'Impact on Financials*',
            note: 'For same targeted wealth creation',
            cells: [
              [
                'Overall cost may be lower as cost will be locked-in at initial share price.',
                'Higher proportion may be recognized in initial years.',
              ],
              [
                'Overall cost may be higher as cost of each grant will be determined at yearly grant date share price.',
                'Cost recognition over the years may be relatively stable.',
              ],
            ],
          },
          {
            label: 'Shareholder Dilution',
            cells: [['Higher initial dilution'], ['Spread-out dilution over time, resulting in gradual shareholder impact.']],
          },
        ],
        footnote: '*Note actual income statement impact depends on various factors and may vary.',
      },
    ],
  },
  {
    slug: 'launching-esops-are-you-getting-the-esop-pool-right',
    kicker: 'Launching ESOPs',
    title: 'Are You Getting The ESOP Pool Right?',
    summary:
      'Why a one-size-fits-all benchmark like 10% can mean diluting too much, too soon, and how to size and phase the pool instead.',
    seriesId: 'esops-and-beyond',
    blocks: [
      {
        type: 'p',
        text: 'Creation of ESOP / Equity Pool is a prerequisite for issuing ESOPs or any other equity settled instruments. Getting the size of ESOP Pool right and managing the timing of consequent dilution is essential in striking the right balance between equity compensation for employees and efficient management of the cap table. However, despite its importance, we note that many Companies take an abstract approach and go with a benchmark of, say, 10% as the size of the ESOP pool.',
      },
      {
        type: 'p',
        text: 'Decisions around the ESOP pool are essentially balancing acts and should be taken only after careful consideration of organization specific factors and after having done proper financial calculations. Below are the key aspects to consider when setting ESOP Pool:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Pool Size & Dilution',
            points: [
              'Ensure the pool is large enough to reward employees but small enough to limit shareholder dilution.',
              'Avoid using one-size-fits-all benchmarks like 10%, which may lead to DILUTING TOO MUCH TOO SOON!',
            ],
          },
          {
            heading: 'Timing & Gradual Creation',
            points: [
              'Create the ESOP pool in phases, adding top-ups when needed instead of setting up the entire pool at the start.',
              'Phased approach minimizes founder dilution and balances equity between founders and investors.',
            ],
          },
          {
            heading: 'Alignment with Growth & Hiring',
            points: [
              'Use bottoms-up approach to assess the right pool size factoring your business plan, employee coverage and hiring projections.',
              'For fast-growing companies, even a small ESOP pool may hold substantial value in the future, helping manage dilution effectively.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Getting the ESOP pool right is crucial. It impacts both shareholder dilution as well as employee’s wealth creation potential.',
      },
    ],
  },

  /* ---------------- Series 03 · Pre-IPO Series ---------------- */
  {
    slug: 'pre-ipo-guide-timing-your-plan-for-maximum-impact',
    kicker: 'Pre-IPO Guide',
    title: 'Timing Your Plan for Maximum Impact',
    summary:
      'With an IPO on the horizon, the ideal window to launch an ESOP is at least 2 to 3 years ahead. Here is why.',
    seriesId: 'pre-ipo-series',
    blocks: [
      {
        type: 'p',
        text: 'As the Indian startup ecosystem enters a new phase of maturity, with a surge in IPO activity and many companies planning to go public within the next 3 to 4 years, the need for a strong, committed team aligned with the company’s long-term goals becomes more critical than ever. This is where a well-timed, pre-IPO-focused ESOP plan can make all the difference.',
      },
      {
        type: 'p',
        text: 'But when is the right time to launch your ESOP plan if you’re eyeing an IPO? In our experience, introducing an ESOP at least 2 to 3 years ahead of the IPO is ideal. Here’s why:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Vesting Period',
            points: [
              'This timeframe allows vesting of significant portion of their ESOPs pre-IPO, maximizing gains on IPO.',
              'Allows linking vesting to key milestones leading up to IPO, enhancing alignment with Company goals.',
            ],
          },
          {
            heading: 'Benefit of Pre-IPO Valuation',
            points: [
              'Employees benefit from pre-IPO share price, allowing them to participate in the growth they help create.',
              'Successive grants deepen commitment and engagement during this crucial period.',
            ],
          },
          {
            heading: 'Liquidity Opportunity for Employees',
            points: [
              'Ensures employees are in a position to fully participate in IPO gains (i.e. main liquidity event for most ESOPs).',
              'Well-timed grants help employees realize substantial financial rewards when the IPO occurs.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Launching your ESOP at the right time can play a critical role in your IPO success by keeping your team motivated, aligned, and invested in the company’s future. Even if you already have an ESOP in place, you may benefit from refining your grant strategy to meet the specific demands and opportunities of an impending IPO, ensuring key talent remains engaged and rewarded during this critical phase.',
      },
    ],
  },
  {
    slug: 'pre-ipo-guide-targeting-the-right-talent',
    kicker: 'Pre-IPO Guide',
    title: 'Targeting the Right Talent',
    summary:
      'Whom to grant ESOPs to in the run-up to an IPO: go selective, cover the people who will steer the listing, and save a slice for strategic hires.',
    seriesId: 'pre-ipo-series',
    blocks: [
      {
        type: 'p',
        text: 'The Pre-IPO stage, typically 3 to 4 years before going public, is a critical period for any company. The people you bring on board and the decisions you make during this time will shape your company’s trajectory for years to come. Equity compensation at this stage is crucial for attracting and retaining talent while laying the foundation for your company’s post-IPO compensation plan.',
      },
      {
        type: 'p',
        text: 'In our last instalment of the Pre-IPO Guide to ESOPs, we explored the timing for launching your ESOP plan. Now, let’s focus on the next step - determining whom to grant ESOPs. Here’s what we recommend:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Do a selective grant',
            points: [
              'A selective ESOP Program at this stage ensures targeted impact, focusing on key contributors to the IPO process. It also helps create meaningful wealth for these individuals, driving better focus, alignment, and retention.',
            ],
          },
          {
            heading: 'Cover the following employees / roles',
            intro: 'Focus on aligning the employees who will steer the Company through the IPO. This typically includes:',
            points: [
              'C-Suite / Leadership',
              'Senior Management',
              'Future leaders (high performing mid-level employees critical to execution and strategic direction)',
            ],
          },
          {
            heading: 'Save something for the future',
            points: [
              'Allocate a portion of the ESOP pool for strategic hires - individuals who may be onboarded in the lead-up to the IPO. This ensures flexibility for attracting top talent and filling key roles that may emerge later.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Allocating ESOPs to these key groups ensures they remain deeply invested in the company’s success and motivated throughout the IPO process. At the same time, this approach helps manage dilution and keep the financial impact on your income statement within acceptable levels, a careful balance required as the company prepares to go public.',
      },
    ],
  },
  {
    slug: 'pre-ipo-guide-how-much-is-just-right',
    kicker: 'Pre-IPO Guide',
    title: 'How Much Is Just Right?',
    summary:
      'Traditional benchmarks are no longer the definitive guide. The considerations for sizing grants when an IPO is on the cards.',
    seriesId: 'pre-ipo-series',
    blocks: [
      { type: 'p', text: 'Our latest instalment in the Pre-IPO Guide to ESOPs delves into one of the most challenging questions in equity compensation: how much to grant?' },
      {
        type: 'p',
        text: 'In today’s dynamic and fast-evolving startup ecosystem, traditional benchmarks for ESOP allocations are no longer the definitive guide they once were. The diversity in equity strategies across companies makes direct comparisons increasingly difficult. Adding to this complexity are a few trailblazing companies with large equity allocations that have gained attention. While these strategies may work for their unique contexts, they often leave founders questioning whether they should follow suit.',
      },
      {
        type: 'p',
        text: 'In this ever-changing landscape, how should companies planning an IPO determine the size of their grants? Below are the key considerations to help you navigate this critical decision:',
      },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Getting the Mathematics Right',
            points: [
              {
                text: 'Ensure grants are reasonable by assessing impact on:',
                sub: [
                  'Shareholder Dilution: Is the dilution within acceptable levels, factoring in future IPO-related dilution and a buffer for future grants?',
                  'Employee Wealth Creation: Are grants meaningful and aligned with retention and motivation goals?',
                  'Income statement: Is the year-on-year impact on the income statement sustainable, especially during the IPO journey?',
                ],
              },
              'Iterative calculations may be required to strike the right balance across all stakeholders i.e., shareholders, employees and the Company.',
            ],
          },
          {
            heading: 'Balancing Benchmarks and Context',
            points: [
              'Tailor grants to your unique circumstances but use broad benchmarks as a reference point.',
              'A common guide: 4x CTC as wealth for C-Suite over 4–5 years, with 1x CTC as a minimum for junior grades.',
              'Recognize that benchmarks vary widely by growth stage and sector, so deviations, higher or lower, may still be justified.',
            ],
          },
          {
            heading: 'Market and Investor Perception',
            points: [
              'Factor in market and investor perception as you approach IPO.',
              'Grants should drive employee commitment while avoiding concerns about over-dilution or misalignment with investor expectations.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Determining the right grant size is critical to ensuring your ESOP strategy supports employee engagement, aligns with your company’s long-term objectives, and maintains financial sustainability through the IPO journey and beyond.',
      },
    ],
  },
  {
    slug: 'pre-ipo-guide-striking-the-right-balance-in-vesting',
    kicker: 'Pre-IPO Guide',
    title: 'Striking the Right Balance in Vesting',
    summary:
      'Why the default 4-year, 25%-a-year schedule may not suit the pre-IPO stage, and what to weigh instead.',
    seriesId: 'pre-ipo-series',
    blocks: [
      {
        type: 'p',
        text: 'In this fourth instalment of our Pre-IPO Guide to ESOPs, we focus on a key decision - structuring vesting schedules and criteria for pre-IPO grants.',
      },
      {
        type: 'p',
        text: 'Vesting criteria is a powerful lever in shaping employee behavior, retention, and performance. A well-structured vesting schedule ensures alignment with company goals while also optimizing the level and pattern of ESOP expenses.',
      },
      {
        type: 'p',
        text: 'Many companies default to a 4-year service-based vesting schedule (25% annually) as it offers simplicity, a reasonable earning period, and equal weightage to each year of service. While effective in many cases, it may not always be the best fit - especially at the Pre-IPO stage, where alignment with IPO readiness and value creation is key. Rather than following a one-size-fits-all approach, companies should assess and tailor their vesting structure to best support their IPO journey and long-term objectives.',
      },
      { type: 'p', text: 'Here are the key considerations to help you get it right:' },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Balancing Pre-IPO and Post-IPO Vesting',
            points: [
              'Aim for at least 75-80% of grant to be vested before or at IPO to maximise employee wealth creation at IPO.',
              'Partial acceleration may be considered based on IPO success or key milestone achievements.',
              'Retain a portion for post-IPO vesting to encourage employee continuity, supplemented with additional post-IPO grants.',
            ],
          },
          {
            heading: 'Performance vs. Service Linkage',
            points: [
              'ESOPs are inherently linked to company performance, however, pure service-based vesting may also lead to ‘Rest and Vest’ behavior.',
              'Milestone-based vesting, such as achieving revenue / profitability targets or market capitalization / share price targets, for Leadership ESOPs may help better align with shareholder / investor expectations.',
              'A hybrid model combining service and performance-based vesting may help balance retention with performance-driven incentives.',
            ],
          },
          {
            heading: 'Impact on Income Statement',
            points: [
              'Vesting criteria directly impacts the level and timing of ESOP charges on the income statement.',
              'Understand year-on-year ESOP cost impact to ensure it remains manageable pre- and post-IPO.',
              'Evaluate accelerated vesting clauses for their financial and disclosure implications.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'Aligning ESOP vesting with IPO objectives ensures employees remain motivated, invested, and committed beyond the IPO. A well-planned vesting structure not only strengthens retention and accountability but also enhances investor confidence and alignment.',
      },
    ],
  },
  {
    slug: 'pre-ipo-guide-setting-the-right-exercise-price',
    kicker: 'Pre-IPO Guide',
    title: 'Setting the Right Exercise Price',
    summary:
      'Exercise price drives dilution and the P&L, and it signals intent to investors and employees alike. Three considerations to get it right.',
    seriesId: 'pre-ipo-series',
    blocks: [
      { type: 'p', text: 'Our fifth instalment of the Pre-IPO Guide to ESOPs focuses on a critical lever - setting the right exercise price!' },
      {
        type: 'p',
        text: 'Exercise price does not just determine employee gains. It also impacts dilution, the income statement charge, and most importantly, signals intent - to both investors and employees. A price close to fair market value signals to investors that the company is conscious of shareholder alignment through its ESOP strategy. A deeper discount, on the other hand, may be seen as more employee-friendly, reinforcing retention and reward, but may require stronger justification depending on the company’s stage and upcoming IPO plans.',
      },
      {
        type: 'p',
        text: 'It is important to view exercise price in the context of the grant’s objective i.e., whether it is meant to reward the founding team for past efforts or to incentivize senior leadership brought in to drive IPO readiness. The key lies in striking the right balance.',
      },
      { type: 'p', text: 'Here are the three key considerations in getting the exercise price right:' },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Founding Team',
            note: 'Rewarding past contribution',
            points: [
              'First-time grants should be priced at face value or deep discount to reflect value already created.',
              'Ensure meaningful upside for early contributors who built the company’s foundation.',
            ],
          },
          {
            heading: 'Leadership & Key Hires',
            note: 'Driving future value creation',
            points: [
              'Moderate discount (20 to 30%) keeps options valuable while creating incentive to drive growth to gain from ESOPs.',
              'Ideal for CXOs or senior hires brought in to lead IPO or scale-up efforts.',
            ],
          },
          {
            heading: 'Dilution & P&L Impact',
            note: 'Balancing financial outcomes',
            points: [
              'Grant size, price, and timing must be aligned to manage dilution ahead of listing.',
              'All else being equal, a higher discount will increase the income statement charge under IND AS 102, but if used smartly, may help limit dilution by optimizing grant size.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'The exercise price should reflect both the intent behind the grant and the message you want to send i.e., aligning stakeholders while supporting employee motivation and IPO readiness.',
      },
    ],
  },
  {
    slug: 'pre-ipo-guide-risk-proofing-your-esop-structure',
    kicker: 'Pre-IPO Guide',
    title: 'Risk-Proofing Your ESOP Structure',
    summary:
      'The best ESOP plans fail without flexible, founder-friendly rules. Building controlled flexibility into the scheme.',
    seriesId: 'pre-ipo-series',
    blocks: [
      {
        type: 'p',
        text: 'Our sixth and final instalment of the Pre-IPO Guide to ESOPs moves beyond the mathematics and focuses on what safeguards your plan - risk mitigation through scheme rules.',
      },
      {
        type: 'p',
        text: 'In our work with high-growth and IPO-bound companies, one lesson stands out - the best ESOP plans fail without flexible, founder-friendly rules. With IPO timelines often fluid, building smart, well-governed flexibility into your ESOP scheme becomes essential.',
      },
      {
        type: 'p',
        text: 'The key is not to over-engineer. It is to build controlled flexibility, so your Board retains freedom to act in the company’s and shareholders’ best interest, while giving employees clarity and confidence.',
      },
      { type: 'p', text: 'Here are the three key considerations when designing ESOP scheme rules:' },
      {
        type: 'groups',
        groups: [
          {
            heading: 'Liquidity Event Rules',
            note: 'Managing outcomes at IPO or sale',
            points: [
              'Cover all types of exit events, not just IPO, and retain Board discretion to define treatment.',
              'Avoid setting up expectations of automatic liquidity in every scenario i.e. preserve optionality for shareholders.',
            ],
          },
          {
            heading: 'Regulatory and Structural Flexibility',
            note: 'Preparing for listing environment',
            points: [
              'If IPO is close, incorporate SEBI SBEB-compliant rules now to ensure a seamless transition.',
              'If IPO is 4 to 5 years ahead, enable future amendments while offering transparency to employees.',
            ],
          },
          {
            heading: 'Governance and Exit Treatment',
            note: 'Ensuring fairness and flexibility',
            points: [
              'Clearly define treatment of resignations and separations, especially for vested ESOPs.',
              'Choose rules that avoid putting employees on cap table before IPO, whilst allowing employees to retain the value they created whilst in service.',
            ],
          },
        ],
      },
      {
        type: 'callout',
        text: 'The best ESOP structures blend strong math with smart governance. Even a well-designed plan can falter if rules are too rigid. Your scheme should support decision making at key inflection points and not restrict it.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Series                                                              */
/* ------------------------------------------------------------------ */

export const series: Series[] = [
  {
    id: 'lets-get-esops-right',
    title: 'Let’s Get ESOPs Right',
    description:
      'A practical series on getting the foundations of an ESOP scheme right: the mathematics, risk management, exercise price, vesting, design and documentation.',
    articleSlugs: [
      'lets-get-the-mathematics-right',
      'lets-get-the-risk-management-right',
      'lets-get-the-exercise-price-right',
      'lets-get-the-vesting-criteria-right',
      'lets-get-the-designing-right',
      'lets-get-the-documentation-right',
      'esops-or-sars-choosing-the-right-instrument',
      'is-this-the-right-time-for-your-organization',
    ],
  },
  {
    id: 'esops-and-beyond',
    title: 'ESOPs & Beyond',
    description:
      'From design checklists and launch mistakes to budgeting, grant strategy and pool sizing: how to plan the cost, dilution and structure of your equity programme.',
    articleSlugs: [
      'esop-design-checklist',
      'is-this-the-right-time-for-your-organization',
      'launch-your-scheme-the-right-way',
      'launching-esops-9-common-mistakes-to-avoid',
      'esop-charge-non-cash-but-not-notional',
      'esop-budgeting-optimize-your-pl-charge',
      'esop-budgeting-choose-the-right-grant-strategy',
      'the-esop-decision-broad-based-or-selective-grant',
      'the-esop-decision-big-grants-or-annual-boosts',
      'launching-esops-are-you-getting-the-esop-pool-right',
    ],
  },
  {
    id: 'pre-ipo-series',
    title: 'Pre-IPO Series',
    description:
      'A six-part guide for IPO-bound companies: when to launch, who to grant to, how much, how to vest, what to price at and how to risk-proof the scheme.',
    articleSlugs: [
      'pre-ipo-guide-timing-your-plan-for-maximum-impact',
      'pre-ipo-guide-targeting-the-right-talent',
      'pre-ipo-guide-how-much-is-just-right',
      'pre-ipo-guide-striking-the-right-balance-in-vesting',
      'pre-ipo-guide-setting-the-right-exercise-price',
      'pre-ipo-guide-risk-proofing-your-esop-structure',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const articleMap = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return articleMap.get(slug);
}

export function getSeries(id: SeriesId): Series {
  return series.find((s) => s.id === id)!;
}

export function getSeriesArticles(s: Series): Article[] {
  return s.articleSlugs.map((slug) => articleMap.get(slug)!).filter(Boolean);
}

function pointText(p: Point): string {
  return typeof p === 'string' ? p : [p.text, ...p.sub].join(' ');
}

function blockText(b: Block): string {
  switch (b.type) {
    case 'p':
    case 'callout':
      return b.text;
    case 'list':
      return b.items.join(' ');
    case 'groups':
      return b.groups
        .map((g) => [g.heading, g.intro ?? '', ...g.points.map(pointText)].join(' '))
        .join(' ');
    case 'table':
      return b.rows.map((r) => [r.label, ...r.cells.flat()].join(' ')).join(' ');
    case 'pdf':
      return '';
  }
}

/** Reading time in whole minutes (min 1) at ~200 words per minute. */
export function readMinutes(a: Article): number {
  const words = a.blocks.map(blockText).join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function hasPdf(a: Article): boolean {
  return a.blocks.some((b) => b.type === 'pdf');
}

/** Total unique articles across all series (one article appears in two series). */
export const uniqueArticleCount = articles.length;

/** Distinct downloadable PDFs linked from the articles (two articles share one PDF). */
export const pdfGuideCount = new Set(
  articles.flatMap((a) => a.blocks.flatMap((b) => (b.type === 'pdf' ? [b.href] : [])))
).size;

