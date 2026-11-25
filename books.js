const books = {
  'auto-layout': {
    title: 'Auto layout',
    intro: 'Show how a layout behaves, not just where elements sit in one screenshot. Structured frames give developers a clearer map to flex and grid layouts.',
    lessons: [
      'Group related elements into rows and stacks. Set padding, gap, alignment, and wrapping explicitly instead of relying on manually positioned layers.',
      'Choose fixed, content-sized, or fill dimensions based on intent. A text block should usually grow with its content; an icon may keep a fixed size.',
      'Describe constraints when the container changes. If a card grows, explain which elements stretch and which stay aligned.',
    ],
    exercise: 'Make a card with a title, description, and button. Double the description length and narrow the frame. Check that the content grows without overlaps or clipped actions.',
  },
  'design-tokens': {
    title: 'Design tokens',
    intro: 'Tokens give recurring visual decisions a shared name. They connect the values in your design file with the values developers use in code.',
    lessons: [
      'Define foundations for color, typography, spacing, and shape. Reuse these values rather than introducing a new number in every screen.',
      'Prefer semantic names such as color.text.secondary or color.action.primary. Names should explain a value’s role, not just its appearance.',
      'Agree on names and formats with developers. Explore values and export a starting JSON file for discussion.',
    ],
    exercise: 'Change a primary color in your design system. Verify that every intended primary action changes, while unrelated text and surfaces stay the same.',
  },
  components: {
    title: 'Components',
    intro: 'A component is a reusable pattern with a clear purpose. Design components are most useful when their structure and options match the components available in code.',
    lessons: [
      'Check the existing library before creating a new pattern. Reuse common buttons, inputs, navigation, and cards when they meet the need.',
      'Define purposeful variants for size, state, or emphasis. Separate content properties from structural differences.',
      'Document required and optional elements. Explain what happens when a card has no image, an action has an icon, or a label becomes longer.',
    ],
    exercise: 'Design three cards with different content using a single component. Change the shared spacing and confirm every instance updates consistently.',
  },
  responsive: {
    title: 'Responsive design',
    intro: 'Responsive design is a set of rules between screen sizes, not only a desktop frame and a mobile frame.',
    lessons: [
      'Describe which elements wrap, stack, hide, or scroll as space changes. Specify minimum and maximum widths where they matter.',
      'Choose breakpoints based on when content stops fitting. Avoid assuming that device names alone determine the right layout.',
      'Check long text, zoomed text, and narrow screens. Preserve reading order, access to important actions, and usable touch targets.',
    ],
    exercise: 'Resize a three-column layout until the cards become cramped. Define when it changes to two columns and then one, without horizontal page scrolling.',
  },
  'content-first': {
    title: 'Content first',
    intro: 'Realistic content reveals layout problems that perfect placeholder text tends to hide.',
    lessons: [
      'Use representative titles, descriptions, images, and data. Include short content, long content, and content that is missing.',
      'Decide when text wraps, truncates, or expands. If you truncate it, explain how people can access the full information.',
      'Consider localization and variable data. Longer translated labels, dates, prices, and user-generated content should not break the hierarchy.',
    ],
    exercise: 'Replace a neat two-word title with a long product name, remove the image, and add a validation message. Check that the interface remains understandable.',
  },
  'interaction-states': {
    title: 'Interaction states',
    intro: 'A working interface needs more than the happy path. Make the transitions and states visible before handoff.',
    lessons: [
      'Show relevant default, hover, focus, pressed, disabled, and loading states for interactive components.',
      'Include empty, error, and success states for data-driven screens. Explain what the person can do next in each state.',
      'Document triggers, keyboard behavior, and feedback. Motion should clarify an interaction and have a reduced-motion alternative.',
    ],
    exercise: 'Map a form from an empty field to an invalid entry, submission, and success. Make sure every step has clear feedback and a sensible next action.',
  },
  accessibility: {
    title: 'Accessibility',
    intro: 'Accessible design considers how people perceive, navigate, and operate an interface. Build those requirements into the design instead of leaving them for the final review.',
    lessons: [
      'Use readable contrast and do not rely on color alone. WCAG AA generally requires 4.5:1 contrast for normal text and 3:1 for large text.',
      'Give controls visible labels, clear focus styles, and a logical keyboard order. Design errors with explanations, not just colored borders.',
      'Include text alternatives for meaningful images and reduced-motion behavior. For dialogs, specify focus containment, Escape, and returning focus when closed.',
    ],
    exercise: 'Walk through a flow without a mouse. Verify that every control is reachable, focus is visible, and all necessary information can be understood without color cues.',
  },
  'clear-handoff': {
    title: 'Clear handoff',
    intro: 'A useful handoff makes the intended behavior easy to find and separates confirmed decisions from open questions.',
    lessons: [
      'Organize screens and components so the main flow is clear. Name layers, states, and assets consistently with the team’s conventions.',
      'Document responsive rules, interactions, edge cases, and accessibility requirements. Export the actual assets needed for implementation.',
      'Call out unresolved questions and review them with developers. Do not make them infer behavior from a single static frame.',
    ],
    exercise: 'Ask someone unfamiliar with a screen to explain how it responds to a narrow viewport and a loading error. Fill in any missing information before handing it off.',
  },
  'grid-space': {
    title: 'Grid and space',
    intro: 'Spacing communicates relationships. A consistent grid makes the hierarchy easier to read and the layout easier to reproduce.',
    lessons: [
      'Use a small, intentional spacing scale. Choose gaps and padding based on grouping instead of making every interval slightly different.',
      'Define container widths, columns, gutters, and alignment. Clarify which sections share a grid and which intentionally break it.',
      'Allow spacing to adapt on narrow screens without losing the grouping of labels, inputs, content, and actions.',
    ],
    exercise: 'Review a page’s vertical spacing. Bring related elements closer together, separate distinct sections, and map those choices to a reusable spacing scale.',
  },
  'design-systems': {
    title: 'Design systems',
    intro: 'A design system connects foundations, reusable components, and usage guidance. It is a shared agreement, not just a library of polished screens.',
    lessons: [
      'Keep design and code libraries aligned. Agree on component names, token names, supported variants, and the source of truth.',
      'Document when to use a component and when not to. Include content guidance, behavior, and accessibility alongside its visual appearance.',
      'Treat changes as shared decisions. Review the impact of a new token or variant and retire obsolete patterns deliberately.',
    ],
    exercise: 'Choose one common component and compare its design and code versions. Record differences in naming, spacing, states, and behavior, then agree on the intended version.',
  },
  'build-together': {
    title: 'Build together',
    intro: 'Design-to-code works better as an ongoing collaboration. Early conversations and reviews of the actual build reduce surprises.',
    lessons: [
      'Discuss constraints and existing components before polishing every screen. Invite implementation feedback while changes are still inexpensive.',
      'Review the real interface with representative content at multiple widths. Check behavior and accessibility, not only visual similarity.',
      'Record intentional differences and update the shared system. Turn repeated fixes into reusable rules rather than one-off exceptions.',
    ],
    exercise: 'Review one built screen together. Pick the most important mismatch, agree on whether design or code should change, and capture the decision in the shared component.',
  },
};

const bookReader = document.querySelector('#book-reader');
const closeReader = document.querySelector('#close-reader');
let readerTrigger = null;

document.querySelector('.cover-gallery').addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest('[data-book]');
  if (!button) return;
  const book = books[button.dataset.book];
  if (!book) throw new Error(`Unknown book topic: ${button.dataset.book}`);
  readerTrigger = button;
  document.querySelector('#reader-title').textContent = book.title;
  document.querySelector('#reader-intro').textContent = book.intro;
  document.querySelector('#reader-exercise').textContent = book.exercise;
  document.querySelector('#reader-cover').src = button.querySelector('img').src;
  const lessons = book.lessons.map((lesson) => {
    const item = document.createElement('li');
    item.textContent = lesson;
    return item;
  });
  document.querySelector('#reader-lessons').replaceChildren(...lessons);
  bookReader.showModal();
  document.body.classList.add('reader-open');
  bookReader.scrollTop = 0;
  closeReader.focus();
});

closeReader.addEventListener('click', () => bookReader.close());
bookReader.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    bookReader.close();
  }
});
bookReader.addEventListener('close', () => {
  document.body.classList.remove('reader-open');
  readerTrigger?.focus({ preventScroll: true });
});
bookReader.addEventListener('click', (event) => {
  if (event.target !== bookReader) return;
  const bounds = bookReader.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    bookReader.close();
  }
});
