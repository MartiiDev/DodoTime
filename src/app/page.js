"use client"
import { useState, useEffect } from "react"
import {
  Card,
  Input,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { Pacifico } from 'next/font/google'

const titleFont = Pacifico({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [placement, setPlacement] = useState("right");
  const [wakeUpTime, setWakeUpTime] = useState("")
  const [sleepTimes, setSleepTimes] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setPlacement(window.innerWidth < 768 ? "bottom" : "right");
    };

    // Set initial placement
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  const calculateSleepTimes = (wakeTime) => {
    const wakeDate = new Date(`2000-01-01T${wakeTime}:00`)
    const sleepTimes = []

    for (let i = 4; i <= 7; i++) {
      const sleepDate = new Date(wakeDate.getTime() - i * 90 * 60 * 1000)
      sleepTimes.push({
        time: sleepDate.toTimeString().slice(0, 5),
        recommended: i === 5,
      })
    }

    return sleepTimes.reverse()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const times = calculateSleepTimes(wakeUpTime)
    setSleepTimes(times)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-starry-night p-4 relative overflow-hidden">
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>
      
      <Card className="w-full max-w-md bg-gray-800/90 text-white p-6 z-10 relative">
        <h1 className={`text-4xl mb-6 text-center text-sky-300 ${titleFont.className}`}>DodoTime</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="time"
            label="What time do you want to wake up?"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            required
            fullWidth
          />
          <Button color="primary" type="submit" className="w-full">
            Calculate Sleep Times
          </Button>
        </form>
        {sleepTimes.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Recommended sleep times:</h2>
            <div className="space-y-2">
              {sleepTimes.map((sleepTime, index) => (
                <Card key={index} className="bg-gray-700/80 p-3 relative">
                  <p className="text-center">{sleepTime.time}</p>
                  {sleepTime.recommended && (
                    <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                      Best 🧸
                    </span>
                  )}
                </Card>
              ))}
            </div>
            <button className="text-xs mt-1 group" onClick={() => handleOpen(placement)}>🤔 <span className="group-hover:underline">Want to know why?</span></button>
          </div>
        )}
      </Card>

      <Drawer 
        isOpen={isOpen} 
        placement={placement} 
        onOpenChange={onOpenChange}
        className={placement === "bottom" ? "h-[80vh]" : ""}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 mb-1">How to know the perfect time to sleep?</DrawerHeader>
              <DrawerBody className="flex flex-col gap-5">
                <p>
                To help you get the best sleep, this website uses the science of sleep cycles.<br/>
                A sleep cycle lasts about 90 minutes and includes different stages of light sleep, deep sleep, and REM sleep.
                </p>
                <p>
                Waking up at the end of a cycle (when you're in light sleep) helps you feel more refreshed, while waking up in the middle of deep sleep can leave you groggy.
                </p>
                <p>
                You provide the time you need to wake up (e.g., 7:00 AM), and this site will calculate the best bedtimes based on completing full sleep cycles.
                </p>
                <p>
                The sleep time marked as "best", allows you to complete 5 full sleep cycles (90 minutes each, 7h30 in total). This helps you wake up feeling refreshed and alert, as you finish your sleep in light sleep rather than deep sleep.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}