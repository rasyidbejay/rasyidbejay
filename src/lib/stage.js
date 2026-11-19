// Shared state between the Home chapters (which write it on scroll and click)
// and the 3D layer stack (which reads it every frame).
export const stage = {
  ch: 0, // 0 hero, 1 work, 2 two readers, 3 introduction, 4 contact
  row: 0, // active Work row
  reader: 'people', // 'people' | 'machines'
  touched: false, // true once the visitor uses the reader switch
}

export function resetStage() {
  stage.ch = 0
  stage.row = 0
  stage.reader = 'people'
  stage.touched = false
}
