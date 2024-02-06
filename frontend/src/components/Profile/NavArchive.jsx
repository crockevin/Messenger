import { Typography, Box } from "@mui/material"
import { useParams } from "react-router-dom"

export default function NavArchive() {
const {id} = useParams()

return (
<Box>
    {id}
</Box>
)
}