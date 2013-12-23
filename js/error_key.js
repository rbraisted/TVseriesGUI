function returnError(code)
{
	switch(parseInt(code))
	{
		
		case 0:
		return "Success";
		break;
		
		case 1:
		return "Unknown Error.";
		break;
		
		case 2:
		return "Invalid XML Message";
		break;
		
		case 3:
		return "Unknown Message";
		break;
		
		case 4:
		return "Missing Element";
		break;
		
		case 5:
		return "Invalid Element Value";
		break;
		
		case 6:
		return "Missing Data";
		break;
		
		case 7:
		return "Unknown File Name";
		break;
		
		case 8:
		return "Can\'t Find File";
		break;
		
		case 9:
		return "File Unreadable";
		break;
		
		case 10:
		return "File Locked";
		break;
		
		case 11:
		return "File Unwritable";
		break;
		
		case 12:
		return "Event Not Found";
		break;
		
		case 13:
		return "Too Many Events";
		break;
		
		case 14:
		return "Datastore Unavailable";
		break;
		
		case 15:
		return "Timed Out";
		break;
		
		case 16:
		return "Invalid Update File";
		break;
		
		case 17:
		return "Duplicate Orbital Position. Try adding/modifing Suffix.";
		break;
		
		default:
		return code;
		break;
		
	}
	
}