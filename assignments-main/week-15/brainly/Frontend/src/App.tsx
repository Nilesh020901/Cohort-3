import './App.css'
import { Button } from './component/Button'
import { PlusIcon } from './icons/Plus'
import { ShareIcon } from './icons/Share'

function App() {
 

  return (
    <div className='flex justify-end items-center gap-4'>
      <Button variant={'primary'} text="Add Content" startIcon={<PlusIcon />}></Button>
      <Button variant={'secondary'} text="Share Brain" startIcon={<ShareIcon />}></Button>
    </div>
  )
}

export default App
