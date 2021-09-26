import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')
GlobalWorkerOptions.workerSrc = pdfjsWorker

export function readFile(buffer) {
  const BASE64_MARKER = ';base64,'
  const base64Index = buffer.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  const base64 = buffer.substring(base64Index)
  const raw = window.atob(base64)
  const array = new Uint8Array(new ArrayBuffer(raw.length))
  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i)
  }
  return pdfAsArray(array)
}

function getText(pageNum, PDFDocumentInstance) {
  return new Promise((resolve, reject) => {
    PDFDocumentInstance.getPage(pageNum)
      .then(pdfPage => {
        pdfPage.getTextContent().then(content => {
          let texts = []
          let text = ''
          let line = 0
          content.items.forEach(c => {
            if (line !== c.transform[5]) {
              if (line !== 0) {
                texts.push(text)
                text = ''
              }
              line = c.transform[5]
            }
            text += c.str
          })
          resolve(texts)
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

function pdfAsArray(array) {
  return new Promise((resolve, reject) => {
    getDocument(array).promise.then(
      pdf => {
        const pdfDocument = pdf
        // Create an array that will contain our promises
        let pagesPromises = []
        for (let i = 0; i < pdf.numPages; i++) {
          ;(pageNumber => {
            pagesPromises.push(getText(pageNumber, pdfDocument))
          })(i + 1)
        }

        Promise.all(pagesPromises).then(pagesText => {
          let texts = []
          pagesText.forEach(pt => {
            texts.push(...pt)
          })
          resolve(texts)
        })
      },
      err => {
        reject(err)
      }
    )
  })
}
