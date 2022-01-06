const htmlSection = document.getElementById('html')
const markupWhat = document.getElementById('markup-what')
const wtfBro = document.getElementById('wtf-bro')

htmlSection.addEventListener('click', e => {
  htmlSection.classList.toggle('active')
  document.getElementById('html-description').classList.toggle('visible')
})

/**
 * Skills & knowledge testing
 */

const validateCodeString = (e, finalString, regexStr, strictContent = false) => {
  const wrapper = e.target.parentElement
  const label = e.target.nextElementSibling
  const value = e.target.value

  const allTags = regexStr.split('(.*?)')
  const fullRegex = new RegExp(regexStr)
  const partialRegex = new RegExp(regexStr.substring(0, regexStr.lastIndexOf('</')))

  let isValid = null

  if (strictContent) {
    if (value.length > 0) {
      isValid = finalString.indexOf(value) === 0
    } else {
      isValid = null
    }
  } else {
    const existingTags = allTags.filter(tag => value.indexOf(tag) > -1)

    /**
     * Clear the label once the first tag exists
     */

    if (value.length > allTags[0].length) {
      label.style.display = 'none'
    } else {
      label.style.display = 'flex'
    }

    if (allTags.length === existingTags.length) {
      isValid = fullRegex.test(value)
    } else {
      if (value.length < allTags[0].length) {
        isValid = allTags[0].indexOf(value) > -1
      } else {
        isValid = partialRegex.test(value)
      }
    }
  }

  const renderBadge = (isValid = null) => {
    const badge = wrapper.querySelector('.code-editor-badge')
    const icon = document.createElement('i')
    
    badge.classList.remove('code-editor-badge--valid')
    badge.classList.remove('code-editor-badge--invalid')

    if (badge.hasChildNodes()) {
      badge.innerHTML = ''
    }

    icon.classList.add('fad')

    if (isValid === true) {
      icon.classList.add('fa-check')
      badge.classList.add('code-editor-badge--valid')
    }
    else if (isValid === false) {
      icon.classList.add('fa-skull')
      badge.classList.add('code-editor-badge--invalid')
    }

    badge.appendChild(icon)
  }

  const toggleValid = isValid => {
    if (isValid === true) {
      e.target.classList.remove('invalid')
      e.target.classList.add('valid')
      wrapper.classList.remove('code-editor--invalid')

      if (finalString.length === e.target.value.length && strictContent) {
        wrapper.classList.add('code-editor--valid')
        renderBadge(true)
      } else if (!strictContent && fullRegex.test(value)) {
        wrapper.classList.add('code-editor--valid')
        renderBadge(true)
      } else {
        wrapper.classList.remove('code-editor--valid')
        renderBadge()
      }
    } else if (isValid === false) {
      e.target.classList.remove('valid')
      e.target.classList.add('invalid')
      wrapper.classList.add('code-editor--invalid')
      wrapper.classList.remove('code-editor--valid')
      renderBadge(false)
    } else {
      e.target.classList.remove('invalid')
      e.target.classList.remove('valid')
      wrapper.classList.remove('code-editor--invalid')
      wrapper.classList.remove('code-editor--valid')
      renderBadge()
    }
  }

  if (e.target.value.length > 0) {
    label.classList.add('invisible')
  } else {
    label.classList.remove('invisible')
  }

  toggleValid(isValid)
}

/**
 * Select the code tests
 */
const htmlTagTest = document.getElementById('write-html-tag')
const paragraphTagTest = document.getElementById('write-paragraph-tag')
const nestedBoldTagTest = document.getElementById('write-nested-bold-tag')

/**
 * Set up the code test validations
 */
const writeHTMLTag = e => validateCodeString(e, '<html></html>', '<html></html>', true)
const writeParagraphTag = e => validateCodeString(e, '<p>Write any text you want here.</p>', '<p>(.*?)</p>')
const writeNestedBoldTag = e => validateCodeString(e, '<p>Let\'s be honest: writing code is <b>the most boring thing ever!</b></p>', '<p>(.*?) <b>(.*?)</b>(.*?)</p>')

/**
 * Listen for code test interaction
 */
htmlTagTest.addEventListener('keyup', writeHTMLTag)
paragraphTagTest.addEventListener('keyup', writeParagraphTag)
nestedBoldTagTest.addEventListener('keyup', e => {
  writeNestedBoldTag(e)

  /**
   * Demo the test result
   */
  const demoNestedBoldText = document.getElementById('nested-bold-text-demo')
  demoNestedBoldText.innerHTML = e.target.value
})