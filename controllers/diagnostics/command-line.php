<?
    require_once($_SERVER['DOCUMENT_ROOT'] . "/controllers/base.php");
    // require($_SERVER['DOCUMENT_ROOT'] . "/models/hd11xml.php");
    // require($_SERVER['DOCUMENT_ROOT'] . "/models/hd11syservice.php");

    class CommandLine extends Base
    {
    	function __construct()
    	{
            parent::Base();
    	}

    	function index()
    	{
    		$this->loadView('diagnostics/command-line.php');
    	}
    }
?>