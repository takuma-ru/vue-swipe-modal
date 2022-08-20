
/* -- interface -- */
type TDisplaySize = 'laptop' | 'mobile'

export const useDeviceStatusStore = () => {
  /* -- state -- */
  /**
   * ディスプレイサイズデータストア
   */
  const displaySize = useState<TDisplaySize>('displaySize', () => ('laptop'))

  /* -- getters -- */
  /**
   * モバイル端末かどうかのフラグを返す
   * @returns モバイル端末かどうか
   */
  const isMobile = () => {
    return displaySize.value === 'mobile'
  }

  /**
   * css用mixin. ディスプレイサイズによってcssの値を変更する必要がある際に使用する
   * @param mobilePrams モバイル端末時のパラメータ
   * @param laptopPrams ラップトップ時のパラメータ
   * @returns ディスプレイサイズに適応したパラメータの値
   */
   const isMobileMixin = (mobilePrams: string, laptopPrams: string) => {
    return isMobile() ? mobilePrams : laptopPrams
  }

  /* -- mutations -- */
  /**
   * displaySizeStoreの値を変更する
   * @param size 画面の大きさ（'laptop' | 'mobile'）
   */
  const updateDisplaySize = (size: TDisplaySize) => {
    displaySize.value = size
  }

  /* -- actions -- */
  /**
   * 現在の画面の大きさを取得し、displaySizeStoreの値に変更する
   */
  const getThisDisplaySize = () => {
    onMounted(() => {
      const get = () => {
        // mobileの場合
        updateDisplaySize('mobile')

        // laptopの場合
        if (window.matchMedia('(min-width: 1024px)').matches) {
          updateDisplaySize('laptop')
        }
      }

      window.addEventListener('resize', get)

      get()
    })
  }

  return {
    displaySize: readonly(displaySize),
    isMobile,
    updateDisplaySize,
    getThisDisplaySize,
    isMobileMixin
  }
}
