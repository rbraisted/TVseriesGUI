<?
	require_once($_SERVER['DOCUMENT_ROOT'] . "/controllers/base.php");
	// require($_SERVER['DOCUMENT_ROOT'] . "/models/hd11xml.php");
	// require($_SERVER['DOCUMENT_ROOT'] . "/models/hd11syservice.php");

	class Updates extends Base
	{
		function __construct()
		{
			parent::Base();
		}

		function index()
		{
			if (false) {
				header("Location: update-tv1.php");
				die();
			}

			$this->loadView('updates/updates.php');
		}
	}

	//	updates/index.php
	//	updates/update-tv1.php
	//	updates/update-tv3.php
	//	updates/update-tv5.php
	//	updates/update-tv6.php
?>