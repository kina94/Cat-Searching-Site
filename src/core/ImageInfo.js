export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, modalClose }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "image-info";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.modalClose = modalClose;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  //모달 닫기
  handleModalClose() {
    this.$imageInfo.addEventListener('click', (e) => {
      try {
        if (e.target.className === 'image-info' || e.target.className === 'close') {
          this.modalClose()
        }
      } catch (e) {
        return
      }
    })

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modalClose()
      }
    })
  }

  render() {
    if (this.data.isLoading) {
      this.$imageInfo.innerHTML = 'Loading...'
    } else {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.catInfo;

        this.$imageInfo.innerHTML = `
            <div class="content-wrapper">
              <div class="title">
                <span>${name.split('/')[0]}</span>
                <button class="close">❌</button>
              </div>
              <figure>
              <img src="${url}" alt="${name}"/>        
              <figcaption class="description">
                <p>성격: ${temperament}</p>
                <p>태생: ${origin}</p>
              </figcaption>
              </figure>
            </div>`;
        this.$imageInfo.style.display = "block";
      } else {
        this.$imageInfo.style.display = "none";
      }
    }


    this.handleModalClose()
  }


}
